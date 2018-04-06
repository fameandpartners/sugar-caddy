const migrateComponents = (data) => {
  const productId = 'fabed627-ca40-4d51-a123-646fe2bffd7f';
  const attachedModules = {};
  Object.keys(data).forEach((key) => {
    const comp = data[key];
    attachedModules[comp.levelId] = Object.assign({}, attachedModules[comp.levelId], { [comp.id]: true });
  });
  return attachedModules;
};

export default migrateComponents;
