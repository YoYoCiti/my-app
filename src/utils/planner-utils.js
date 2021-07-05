/*Checks if module can be added into planner*/
export function isDuplicate(plannedModules, toAddModule) {
  for (const elem of plannedModules) {
    for (const mod of elem.acadSemester) {
      if (mod.moduleCode === toAddModule.moduleCode) {
        return {
          disabled: true,
          message: "Module already added",
        };
      }
    }
  }
  return { disabled: false, message: "" };
}
