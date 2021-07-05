import { isDuplicate } from "./planner-utils";

describe("isDuplicate", () => {
  it("should return true when added module already exists", () => {
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
    expect(isDuplicate(testPlannedModules, testToAddModule)).toBeTruthy();
  });

  it("should return false when added module is unique", () => {
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
    };
    expect(isDuplicate(testPlannedModules, testToAddModule)).toBeFalsy();
  });
});
