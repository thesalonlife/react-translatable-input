import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'flag-icons/css/flag-icons.min.css';
import tags from 'language-tags';

const propTypes = {
  lang: PropTypes.string.isRequired,    // The current editing language
  values: PropTypes.object.isRequired,  // The object containing the translated strings
  textarea: PropTypes.bool,             // Use a textarea for a multi-line input?

  onLanguageChange: PropTypes.func,     // Callback on language selection
  onValueChange: PropTypes.func,        // Callback on text entered
  onKeyDown: PropTypes.func,            // Callback on keydown when text input is focused

  placeholder: PropTypes.string,        // The placeholder to show when the input field is empty
  classes: PropTypes.string,            // Additional HTML classes to pass to the component
  disabled: PropTypes.bool,             // Is the component disabled?
  showLanguageName: PropTypes.bool,     // Show the language name label next to the flag?
  langTranslator: PropTypes.func,        // Translate iso langage codes to language names
};

class TranslatableInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFocused: false,
    };
  }

  keyPressed(e) {
    const { onKeyDown } = this.props;

    if (typeof (onKeyDown) === 'function') {
      onKeyDown(e);
    }
  }

  changeLanguage(lang) {
    const { onLanguageChange } = this.props;

    if (typeof (onLanguageChange) === 'function') {
      onLanguageChange(lang.value);
    }
  }

  changeValue(value) {
    const { onValueChange, lang } = this.props;

    if (typeof (onValueChange) === 'function') {
      onValueChange(value, lang);
    }
  }

  focused(isFocused) {
    this.setState({
      isFocused,
    });
  }

  renderFlag(option) {
    const { showLanguageName, langTranslator } = this.props;
    const tag = tags(option.value);
    let langClasses = '';

    if (tag.valid() === false) {
      // the default language
      const defaultName = typeof (langTranslator) === 'function' ? langTranslator('default') : 'default';
      return (
        <div>
          <div
            className="flag-icon flag-icon-default"
            title={option.value}
          />
          {showLanguageName ?
            <div className="language-name" title={defaultName}>{defaultName}</div> : null}
        </div>
      );
    }

    const langName = typeof (langTranslator) === 'function' ? langTranslator(option.value) : option.value;
    let regCode = 'default';
    let langCode;

    if (typeof tag.find('region') === 'object') {
      regCode = tag.find('region').data.subtag;
    } else if (typeof tag.find('language') === 'object') {
      regCode = tag.find('language').data.subtag;
      langCode = tag.find('language').data.subtag;
    } else {
      langCode = 'default';
    }

    if (langCode !== undefined) {
      langClasses = `flag-icon-lang-default flag-icon-lang-${langCode} `;
    }

    langClasses += `flag-icon flag-icon-${regCode}`;

    return (
      <div>
        <div
          className={langClasses}
          title={option.value}
        />
        {showLanguageName ? <div className="language-name" title={langName}>{langName}</div> : null}
      </div>
    );
  }

  render() {
    const { values, lang, classes, showLanguageName, textarea } = this.props;
    const { isFocused } = this.state;

    const langOptions = Object.keys(values)
      .filter(l => tags(l)
        .valid())
      .map(tag => ({ label: tag, value: tag }));

    // put default language on top of the list, if present
    if (values.hasOwnProperty('default')) {
      langOptions.unshift({ label: 'default', value: 'default' });
    }

    let componentClasses = 'TranslatableInput';

    if (isFocused) {
      componentClasses += ' is-focused';
    }

    if (showLanguageName) {
      componentClasses += ' has-language-name';
    }

    if (textarea) {
      componentClasses += ' uses-textarea';
    }

    if (typeof (classes) === 'string') {
      componentClasses += ` ${classes}`;
    }

    return (
      <div className={componentClasses}>
        <Select
          value={lang}
          options={langOptions}
          valueRenderer={value => this.renderFlag(value)}
          optionRenderer={option => this.renderFlag(option)}
          onChange={val => this.changeLanguage(val)}
          searchable={false}
          clearable={false}
          disabled={this.props.disabled}
          onFocus={() => this.focused(true)}
          onBlur={() => this.focused(false)}
        />
        {
          textarea ?
            <textarea
              type="text"
              value={values[lang]}
              onChange={e => this.changeValue(e.target.value)}
              onKeyDown={e => this.keyPressed(e)}
              placeholder={this.props.placeholder}
              disabled={this.props.disabled}
              onFocus={() => this.focused(true)}
              onBlur={() => this.focused(false)}
            />
            : <input
              type="text"
              value={values[lang]}
              onChange={e => this.changeValue(e.target.value)}
              onKeyDown={e => this.keyPressed(e)}
              placeholder={this.props.placeholder}
              disabled={this.props.disabled}
              onFocus={() => this.focused(true)}
              onBlur={() => this.focused(false)}
            />
        }
      </div>
    );
  }
}

TranslatableInput.propTypes = propTypes;

export default TranslatableInput;
