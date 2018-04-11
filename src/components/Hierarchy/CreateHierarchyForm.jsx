import React from 'react';
import PropTypes from 'prop-types';
import uuidV4 from 'uuid/v4';
import * as hierarchyActions from 'actions/hierarchy';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TextInput from 'components/common/TextInput';

const propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  createHierarchy: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  order: PropTypes.number.isRequired,
  productId: PropTypes.string.isRequired,
};

const CreateHierarchyForm = ({
  handleSubmit,
  productId,
  reset,
  createHierarchy,
  order,
}) => {
  const handleHierarchySubmit = (data) => {
    console.log('data', data, productId);
    const id = uuidV4();
    const hierarchy = Object.assign({}, data, { id, order });
    console.log(productId, hierarchy);
    createHierarchy(productId, hierarchy);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleHierarchySubmit)}>
      <div className="mb-2 text-center text-grey-darkest">Level Name</div>
      <div className="flex items-center">
        <div
          className="flex-1 border-b border-grey-darkest"
          style={{ marginBottom: 2, marginTop: 1 }}
        />
        <div>
          <Field
            name="name"
            type="text"
            component={TextInput}
            inputClassName="border-grey-darker hover:border-grey-darker rounded-none border"
          />
        </div>
        <div
          className="flex-1 border-b border-grey-darkest"
          style={{ marginBottom: 2, marginTop: 1 }}
        />
      </div>
    </form>
  );
};

CreateHierarchyForm.propTypes = propTypes;

export default compose(
  reduxForm({
    form: 'CreateHierarchyForm',
  }),
  connect(
    state => ({ productId: state.products.get('currentId'), order: state.hierarchy.get('data').size }),
    hierarchyActions,
  ),
)(CreateHierarchyForm);
