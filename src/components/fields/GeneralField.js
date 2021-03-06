import React from 'react';
import UnsupportedField from './UnsupportedField';
import { getSchemaType, deepEquals } from '../../utils';

const COMPONENT_TYPES = {
  view: 'ObjectView',
  flatList: 'ObjectFlatList',
};

function getFieldComponent(schema, uiSchema, idSchema, fields) {
  const field = uiSchema['ui:field'];
  if (typeof field === 'function') {
    return field;
  }
  if (typeof field === 'string' && field in fields) {
    return fields[field];
  }

  const componentName = COMPONENT_TYPES[getSchemaType(schema)];
  return componentName in fields
    ? fields[componentName]
    : () => {
        return (
          <UnsupportedField
            schema={schema}
            idSchema={idSchema}
            reason={`Unknown field type ${schema.type}`}
          />
        );
      };
}

function GeneralFieldRender(props) {}

class GeneralField extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    // if schemas are equal idSchemas will be equal as well,
    // so it is not necessary to compare
    return !deepEquals(
      { ...this.props, idSchema: undefined },
      { ...nextProps, idSchema: undefined },
    );
  }

  render() {
    return GeneralFieldRender(this.props);
  }
}

export default GeneralField;
