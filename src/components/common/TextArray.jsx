import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import TextInput from './TextInput';
import TextBlock from './TextBlock';

const propTypes = {
  fields: PropTypes.object.isRequired,
};

const TextArray = ({ fields }) => (
  <ul className="list-reset">
    {fields.map((item, index) => {
      if (index === fields.getAll().length - 1) {
        return (
          <li key={item}>
            <Field
              placeholder="Press enter to create"
              name={item}
              type="text"
              component={TextInput}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  fields.push('');
                }
              }}
            />
          </li>
        );
      }
      return (
        <li key={item} className="flex mb-1">
          <Field
            name={item}
            component={TextBlock}
            onDelete={() => fields.remove(index)}
          />
        </li>
      );
    })}
  </ul>
);

TextArray.propTypes = propTypes;

export default TextArray;
