import { upperFirst } from "lodash";

export const relatives = [
    { name: "Nofar", relation: "girlfriend" },
    { name: "Or", relation: "brother" },
    { name: "Sahar", relation: "sister" },
    { name: "Shahar", relation: "sister" },
    { name: "Ofek", relation: "sister" },
    { name: "Yahel", relation: "brother" }
];

export const getRelation = (name: string) => {
    const relative = relatives.find((relative) => relative.name.toLowerCase() === name.toLowerCase());
    return relative ? upperFirst(relative.relation) : "Friend";
}