import Vue from "vue";
import {upperFirst, camelCase} from "lodash";

const requireAtomComponent = require.context(
  // The relative path of the components folder
  "./components/atoms",
  // Whether or not to look in subfolders
  false,
  // The regular expression used to match base component filenames
  /a-sp-(^.\/)|\w+\.(vue|js)$/
);

const requireMoleculeComponent = require.context(
  // The relative path of the components folder
  "./components/molecules",
  // Whether or not to look in subfolders
  true,
  // The regular expression used to match base component filenames
  /m-sp-(^.\/)|\w+\.(vue|js)$/
);


requireMoleculeComponent.keys().forEach((fileName) => {
  const componentConfig = requireMoleculeComponent(fileName);

  const componentName = upperFirst(
    camelCase(
      fileName
        .split("/")
        .pop()
        .replace(/\.\w+$/, "")
    )
  );

  Vue.component(componentName, componentConfig.default || componentConfig);
});

requireAtomComponent.keys().forEach((fileName) => {
  const componentConfig = requireAtomComponent(fileName);

  const componentName = upperFirst(
    camelCase(
      fileName
        .split("/")
        .pop()
        .replace(/\.\w+$/, "")
    )
  );

  Vue.component(componentName, componentConfig.default || componentConfig);
});
