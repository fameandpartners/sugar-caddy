import uuidV4 from 'uuid/v4';
import pick from 'lodash/pick';

const convertHierarchy = (hierarchy) => {
  const newHier = {};
  const newComponent = {};
  Object.keys(hierarchy).forEach((key) => {
    const id = uuidV4();
    const level = hierarchy[key];
    const category = level.order <= 3 ? 'top' : 'bottom';
    newHier[id] = Object.assign({}, pick(level, ['name', 'order']), { id, category });
    if (level.customizations) {
      Object.keys(level.customizations).forEach((customKey) => {
        const component = level.customizations[customKey];
        newComponent[customKey] = Object.assign({}, component, { id: customKey, levelId: id });
      });
    }
  });
  return JSON.stringify({
    hierarchy: newHier,
    components: newComponent,
  });
};

export default convertHierarchy;
