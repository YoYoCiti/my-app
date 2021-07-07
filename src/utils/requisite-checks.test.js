import {
  checkPrerequisites,
  getModulesTaken,
  getPrereqTree,
} from "./requisite-checks";

const DEFAULT_PLANNER = [
  {
    acadSemester: [
      { moduleCode: "MA1521" },
      { moduleCode: "MA1101R" },
      { moduleCode: "GEH1032" },
      { moduleCode: "CS1231S" },
      { moduleCode: "CS1101S" },
      { moduleCode: "" },
    ],
  },
  {
    acadSemester: [
      { moduleCode: "CS2030S" },
      { moduleCode: "CS2040S" },
      { moduleCode: "IS1103" },
      { moduleCode: "ES2660" },
      { moduleCode: "GEQ1000" },
      { moduleCode: "CS1010R" },
      { moduleCode: "" },
    ],
  },
  {
    acadSemester: [
      { moduleCode: "CS2103T" },
      { moduleCode: "CS2101" },
      { moduleCode: "CS2100" },
      { moduleCode: "" },
    ],
  },
  { acadSemester: [{ moduleCode: "" }] },
  { acadSemester: [{ moduleCode: "" }] },
  { acadSemester: [{ moduleCode: "" }] },
  { acadSemester: [{ moduleCode: "" }] },
  { acadSemester: [{ moduleCode: "" }] },
];

describe("getModulesTaken successfully converts plannedModules to an array of modules taken before given semester", () => {
  it("Returns empty array for input Sem 2", () => {
    const res = [];
    expect(getModulesTaken(DEFAULT_PLANNER, 0)).toStrictEqual(res);
  });

  it("Returns first sem modules for input Sem 2", () => {
    const res = ["MA1521", "MA1101", "GEH1032", "CS1231", "CS1101"];
    expect(getModulesTaken(DEFAULT_PLANNER, 1)).toStrictEqual(res);
  });

  it("Returns first year modules for input Sem 3", () => {
    const res = [
      "MA1521",
      "MA1101",
      "GEH1032",
      "CS1231",
      "CS1101",
      "CS2030",
      "CS2040",
      "IS1103",
      "ES2660",
      "GEQ1000",
      "CS1010",
    ];
    expect(getModulesTaken(DEFAULT_PLANNER, 2)).toStrictEqual(res);
  });
});

describe("test checkPrerequisites function", () => {
  it("should return null as prerequisite fulfilled", () => {
    const prereqTree = {
      and: [
        {
          or: ["CS1020", "CS2020", "CS2030", "CS2040"],
        },
        {
          or: ["MA1100", "CS1231"],
        },
      ],
    };
    expect(
      checkPrerequisites(DEFAULT_PLANNER, { moduleCode: "CS2102" }, 2)
    ).toBe(null);
  });

  it("should return array of unfulfilled prerequisite", () => {
    const prereqTree = {
      or: ["CS2100", "EE2007", "EE2024", "EE2028"],
    };
    expect(
      checkPrerequisites(DEFAULT_PLANNER, { moduleCode: "CS2106" }, 2)
    ).toStrictEqual([prereqTree]);
  });
});

describe("getPrereqTree successfully retrieves prereq tree of given module", () => {
  it("obtain prereq tree of CS2102", () => {
    expect(getPrereqTree("CS2102")).toStrictEqual({
      and: [
        {
          or: ["CS1020", "CS2020", "CS2030", "CS2040"],
        },
        {
          or: ["MA1100", "CS1231"],
        },
      ],
    });
  });
});
