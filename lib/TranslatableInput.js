'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

require('flag-icons/css/flag-icons.min.css');

var _languageTags = require('language-tags');

var _languageTags2 = _interopRequireDefault(_languageTags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  lang: _propTypes2.default.string.isRequired, // The current editing language
  values: _propTypes2.default.object.isRequired, // The object containing the translated strings
  textarea: _propTypes2.default.bool, // Use a textarea for a multi-line input?

  onLanguageChange: _propTypes2.default.func, // Callback on language selection
  onValueChange: _propTypes2.default.func, // Callback on text entered
  onKeyDown: _propTypes2.default.func, // Callback on keydown when text input is focused

  placeholder: _propTypes2.default.string, // The placeholder to show when the input field is empty
  classes: _propTypes2.default.string, // Additional HTML classes to pass to the component
  disabled: _propTypes2.default.bool, // Is the component disabled?
  showLanguageName: _propTypes2.default.bool, // Show the language name label next to the flag?
  langTranslator: _propTypes2.default.func // Translate iso langage codes to language names
};

var TranslatableInput = function (_Component) {
  _inherits(TranslatableInput, _Component);

  function TranslatableInput(props) {
    _classCallCheck(this, TranslatableInput);

    var _this = _possibleConstructorReturn(this, (TranslatableInput.__proto__ || Object.getPrototypeOf(TranslatableInput)).call(this, props));

    _this.state = {
      isFocused: false
    };
    return _this;
  }

  _createClass(TranslatableInput, [{
    key: 'keyPressed',
    value: function keyPressed(e) {
      var onKeyDown = this.props.onKeyDown;


      if (typeof onKeyDown === 'function') {
        onKeyDown(e);
      }
    }
  }, {
    key: 'changeLanguage',
    value: function changeLanguage(lang) {
      var onLanguageChange = this.props.onLanguageChange;


      if (typeof onLanguageChange === 'function') {
        onLanguageChange(lang.value);
      }
    }
  }, {
    key: 'changeValue',
    value: function changeValue(value) {
      var _props = this.props,
          onValueChange = _props.onValueChange,
          lang = _props.lang;


      if (typeof onValueChange === 'function') {
        onValueChange(value, lang);
      }
    }
  }, {
    key: 'focused',
    value: function focused(isFocused) {
      this.setState({
        isFocused: isFocused
      });
    }
  }, {
    key: 'renderFlag',
    value: function renderFlag(option) {
      var _props2 = this.props,
          showLanguageName = _props2.showLanguageName,
          langTranslator = _props2.langTranslator;

      var tag = (0, _languageTags2.default)(option.value);
      var langClasses = '';

      if (tag.valid() === false) {
        // the default language
        var defaultName = typeof langTranslator === 'function' ? langTranslator('default') : 'default';
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement('div', {
            className: 'flag-icon flag-icon-default',
            title: option.value
          }),
          showLanguageName ? _react2.default.createElement(
            'div',
            { className: 'language-name', title: defaultName },
            defaultName
          ) : null
        );
      }

      var langName = typeof langTranslator === 'function' ? langTranslator(option.value) : option.value;
      var regCode = 'default';
      var langCode = void 0;

      if (_typeof(tag.find('region')) === 'object') {
        regCode = tag.find('region').data.subtag;
      } else if (_typeof(tag.find('language')) === 'object') {
        regCode = tag.find('language').data.subtag;
        langCode = tag.find('language').data.subtag;
      } else {
        langCode = 'default';
      }

      if (langCode !== undefined) {
        langClasses = 'flag-icon-lang-default flag-icon-lang-' + langCode + ' ';
      }

      langClasses += 'flag-icon flag-icon-' + regCode;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('div', {
          className: langClasses,
          title: option.value
        }),
        showLanguageName ? _react2.default.createElement(
          'div',
          { className: 'language-name', title: langName },
          langName
        ) : null
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props3 = this.props,
          values = _props3.values,
          lang = _props3.lang,
          classes = _props3.classes,
          showLanguageName = _props3.showLanguageName,
          textarea = _props3.textarea;
      var isFocused = this.state.isFocused;


      var langOptions = Object.keys(values).filter(function (l) {
        return (0, _languageTags2.default)(l).valid();
      }).map(function (tag) {
        return { label: tag, value: tag };
      });

      // put default language on top of the list, if present
      if (values.hasOwnProperty('default')) {
        langOptions.unshift({ label: 'default', value: 'default' });
      }

      var componentClasses = 'TranslatableInput';

      if (isFocused) {
        componentClasses += ' is-focused';
      }

      if (showLanguageName) {
        componentClasses += ' has-language-name';
      }

      if (textarea) {
        componentClasses += ' uses-textarea';
      }

      if (typeof classes === 'string') {
        componentClasses += ' ' + classes;
      }

      return _react2.default.createElement(
        'div',
        { className: componentClasses },
        _react2.default.createElement(_reactSelect2.default, {
          value: lang,
          options: langOptions,
          valueRenderer: function valueRenderer(value) {
            return _this2.renderFlag(value);
          },
          optionRenderer: function optionRenderer(option) {
            return _this2.renderFlag(option);
          },
          onChange: function onChange(val) {
            return _this2.changeLanguage(val);
          },
          searchable: false,
          clearable: false,
          disabled: this.props.disabled,
          onFocus: function onFocus() {
            return _this2.focused(true);
          },
          onBlur: function onBlur() {
            return _this2.focused(false);
          }
        }),
        textarea ? _react2.default.createElement('textarea', {
          type: 'text',
          value: values[lang],
          onChange: function onChange(e) {
            return _this2.changeValue(e.target.value);
          },
          onKeyDown: function onKeyDown(e) {
            return _this2.keyPressed(e);
          },
          placeholder: this.props.placeholder,
          disabled: this.props.disabled,
          onFocus: function onFocus() {
            return _this2.focused(true);
          },
          onBlur: function onBlur() {
            return _this2.focused(false);
          }
        }) : _react2.default.createElement('input', {
          type: 'text',
          value: values[lang],
          onChange: function onChange(e) {
            return _this2.changeValue(e.target.value);
          },
          onKeyDown: function onKeyDown(e) {
            return _this2.keyPressed(e);
          },
          placeholder: this.props.placeholder,
          disabled: this.props.disabled,
          onFocus: function onFocus() {
            return _this2.focused(true);
          },
          onBlur: function onBlur() {
            return _this2.focused(false);
          }
        })
      );
    }
  }]);

  return TranslatableInput;
}(_react.Component);

TranslatableInput.propTypes = propTypes;

exports.default = TranslatableInput;