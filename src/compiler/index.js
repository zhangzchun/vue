/* @flow */

import { parse } from './parser/index'
import { optimize } from './optimizer'
import { generate } from './codegen/index'
import { createCompilerCreator } from './create-compiler'

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
export const createCompiler = createCompilerCreator(function baseCompile (
  template: string,
  options: CompilerOptions
): CompiledResult {
    /*zzc
    * 1：解析：模板转化为对象
    *
    * */
  const ast = parse(template.trim(), options)
    /*2: 优化：标记静态节点； diff时，可以跳过*/
  if (options.optimize !== false) {
    optimize(ast, options)
  }
  /*3：代码生成：*/
  const code = generate(ast, options)
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
})
