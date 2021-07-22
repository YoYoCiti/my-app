/*Produce appropriate error state for invalid entries into planner*/
export function checkInvalidEntry(plannedModules, toAddModule, semSelected) {
  //Undefined
  if (!toAddModule) {
    return { disabled: true };
  }

  if (isDuplicate(plannedModules, toAddModule)) {
    return {
      disabled: true,
      message: "Module has already been added.",
    };
  } else if (notOfferedInSem(toAddModule, semSelected)) {
    const validSem = semSelected % 2 !== 0 ? 1 : 2;
    return {
      disabled: true,
      message: "Module is only offered in Semester " + validSem,
    };
  } else {
    return { disabled: false, message: "" };
  }
}

/*Checks if added module is not offered in current selected semester*/
function notOfferedInSem(toAddModule, semSelected) {
  const sem = semSelected % 2 === 0 ? 1 : 2;
  return (
    toAddModule.semesterData.length !== 0 &&
    toAddModule.semesterData.length !== 2 &&
    toAddModule.semesterData[0].semester !== sem
  );
}

/*Checks if added module already exists in planner*/
function isDuplicate(plannedModules, toAddModule) {
  for (const elem of plannedModules) {
    for (const mod of elem.acadSemester) {
      if (mod.moduleCode === toAddModule.moduleCode) {
        return true;
      }
    }
  }
  return false;
}
