"use strict";
import { transpileToHtml, transpileToBase } from "../scripts/transpiler/baseTranspiler.js";
const useBaseTranspiler = (data) => {
    const transpiledHtml = transpileToHtml(data);
    const transpiledBase = transpileToBase(data);
    return { transpiledBase, transpiledHtml };
};
export default useBaseTranspiler;
