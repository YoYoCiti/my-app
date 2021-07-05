import { checkInvalidEntry } from "./planner-utils";

describe("checkInvalidEntry can catch duplicates", () => {
  it("should return duplicate error message when module added already exists", () => {
    const testPlannedModules = Array(8).fill({
      acadSemester: [{ moduleCode: "", title: "Add Modules" }],
    });
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
    expect(checkInvalidEntry(testPlannedModules, testToAddModule).message).toBe(
      "Module has already been added."
    );
  });

  it("should return empty error message when module added is unique", () => {
    const testPlannedModules = Array(8).fill({
      acadSemester: [{ moduleCode: "", title: "Add Modules" }],
    });
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
      checkInvalidEntry(testPlannedModules, testToAddModule).disabled
    ).toBeFalsy();
  });
});

describe("checkInvalidEntry can catch invalid semesters", () => {
  it("should return invalid semester error message when module not offered", () => {
    const testPlannedModules = Array(8).fill({
      acadSemester: [{ moduleCode: "", title: "Add Modules" }],
    });
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
      checkInvalidEntry(testPlannedModules, testToAddModule, 0).message
    ).toBe("Module is only offered in Semester 2");
  });

  it("corner case - should return empty error message when module does not have semester data", () => {
    const testPlannedModules = Array(8).fill({
      acadSemester: [{ moduleCode: "", title: "Add Modules" }],
    });
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
      checkInvalidEntry(testPlannedModules, testToAddModule, 1).disabled
    ).toBeFalsy();
  });
});
