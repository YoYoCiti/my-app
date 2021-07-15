/*After adding module, check if its prerequisites are fulfilled. If prerequisities fulfilled, return null, otherwise, 
array of unfulfilled requirements is returned
Note that this function returns a promise whose results are either null or the array*/
export async function checkPrerequisites(
  plannedModules,
  addedModule,
  semSelected,
  exemptedModules
) {
  const modulesTaken = getModulesTaken(
    plannedModules,
    semSelected,
    exemptedModules
  );
  const prereqTree = await getPrereqTree(addedModule.moduleCode);

  function traverseTree(tree) {
    if (typeof tree === "undefined") {
      return null;
    }

    if (typeof tree === "string") {
      return modulesTaken.includes(tree) ? null : [tree];
    }

    if ("or" in tree) {
      //!!null === false
      return tree.or.every((child) => !!traverseTree(child))
        ? //All returns non-null (true) so all unfulfilled
          [tree]
        : null;
    }

    if ("and" in tree) {
      const unfulfilled = tree.and
        .map((child) => traverseTree(child))
        .filter((elem) => elem !== null);
      return unfulfilled.length === 0
        ? null
        : unfulfilled.length === 1
        ? unfulfilled.flat()
        : [{ and: unfulfilled.flat() }];
    }
  }

  return traverseTree(prereqTree);
}

/*Convert plannedModules into array of modules that have been taken before the given semester*/
function getModulesTaken(plannedModules, sem, exemptedModules) {
  let modulesTaken = exemptedModules.slice();
  plannedModules.slice(0, sem).forEach((element) => {
    element.acadSemester.forEach((mod) => {
      if (mod.moduleCode !== "") {
        //Insert non-variant version
        const match = /([A-Z]+\d+)[A-Z]+$/gi.exec(mod.moduleCode);
        modulesTaken.push(match ? match[1] : mod.moduleCode);
      }
    });
  });
  return modulesTaken;
}

async function getPrereqTree(moduleCode) {
  let tree = await fetch(
    `https://api.nusmods.com/v2/2021-2022/modules/${moduleCode}.json`
  )
    .then((response) => response.json())
    .then((data) => {
      return data.prereqTree;
    });
  return tree;
}
