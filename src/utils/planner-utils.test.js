import { checkInvalidEntry } from "./planner-utils";

const DEFAULT_PLANNER = Array(8).fill({
  acadSemester: [{ moduleCode: "", title: "Add Modules" }],
});

const NO_ERROR_STATE = { disabled: false, message: "" };
const DUPLICATE_ERROR_STATE = {
  disabled: true,
  message: "Module has already been added.",
};
const INVALID_SEM_ERROR_STATE = {
  disabled: true,
  message: "Module is only offered in Semester 2",
};

describe("checkInvalidEntry can catch duplicates", () => {
  it("should return duplicate error message when module added already exists", () => {
    const testPlannedModules = DEFAULT_PLANNER.slice();
    testPlannedModules[0] = {
      acadSemester: [
        { moduleCode: "CS1101S", title: "Programming Methodology" },
        { moduleCode: "", title: "Add Modules" },
      ],
    };
    const testToAddModule = {
      moduleCode: "CS1101S",
      title: "Programming Methodology",
    };
    expect(
      checkInvalidEntry(testPlannedModules, testToAddModule)
    ).toStrictEqual(DUPLICATE_ERROR_STATE);
  });

  it("should return no error state when module added is unique", () => {
    const testPlannedModules = DEFAULT_PLANNER.slice();
    testPlannedModules[0] = {
      acadSemester: [
        { moduleCode: "CS1231S", title: "Discrete Structures" },
        { moduleCode: "", title: "Add Modules" },
      ],
    };
    const testToAddModule = {
      moduleCode: "CS1101S",
      title: "Programming Methodology",
      semesterData: [{ semester: 1 }, { semester: 2 }],
    };
    expect(
      checkInvalidEntry(testPlannedModules, testToAddModule)
    ).toStrictEqual(NO_ERROR_STATE);
  });
});

describe("checkInvalidEntry can catch invalid semesters", () => {
  it("should return invalid semester error message when module not offered", () => {
    const testPlannedModules = DEFAULT_PLANNER.slice();
    testPlannedModules[0] = {
      acadSemester: [
        { moduleCode: "CS1101S", title: "Programming Methodology" },
        { moduleCode: "", title: "Add Modules" },
      ],
    };
    const testToAddModule = {
      moduleCode: "CS2108",
      title: "Introduction to Media Computing",
      semesterData: [{ semester: 2 }],
    };
    expect(
      checkInvalidEntry(testPlannedModules, testToAddModule, 0)
    ).toStrictEqual(INVALID_SEM_ERROR_STATE);
  });

  it("corner case - should return no error state when module does not have semester data", () => {
    const testPlannedModules = DEFAULT_PLANNER.slice();
    testPlannedModules[0] = {
      acadSemester: [
        { moduleCode: "CS1231S", title: "Discrete Structures" },
        { moduleCode: "", title: "Add Modules" },
      ],
    };
    const testToAddModule = {
      moduleCode: "CS1101S",
      title: "Programming Methodology",
      semesterData: [],
    };
    expect(
      checkInvalidEntry(testPlannedModules, testToAddModule, 1)
    ).toStrictEqual(NO_ERROR_STATE);
  });
});
