# Internal

> Overview of the code base of baldrick-doc-ts

This document has been generated automatically by
[baldrick-doc-ts](https://github.com/flarebyte/baldrick-doc-ts)

## Diagram of the dependencies

```mermaid
classDiagram
class `client.ts`{
  +commanding()
  +runClient()
}
class `commanding-action.ts`{
  +updateAll()
  +GenerateTypedocAction()
  +GenerateTypedocActionOpts()
  +ParseAction()
  +ParseActionOpts()
  +RunnerContext()
  +parseAction()
  +cmdGenerateTypedocAction()
  +cmdParseAction()
}
class `commanding-data.ts`{
  +CmdOption()
  +CmdOptionsGeneratorTypedoc()
  +CmdOptionsParser()
}
class `commanding-helper.ts`{
  +path()
  +Option()
  +CmdOption()
  - capitalize()
  - decapitalize()
  +toCamelCase()
  +toCommanderOption()
  +splitDocBase()
}
class `commanding.ts`{
  +Command()
  +cmdOptionsGenerator()
  +cmdOptionsParser()
  +splitDocBase()
  +toCommanderOption()
  +getPackageName()
  +toFeatures()
  +GenerateTypedocAction()
  +GenerateTypedocActionOpts()
  +GenerateTypedocRawOpts()
  +ParseAction()
  +ParseActionOpts()
  +ParseRawOpts()
  +RunnerContext()
  +basicFormatter()
  +errorFormatter()
  +version()
}
class `env-helper.ts`{
  +getPackageName()
}
class `feature-helper.ts`{
  +SupportedFeature()
  - isFeature()
  - toFeature()
  +toFeatures()
}
class `fp-diagram.ts`{
  +FunctionalProgrammingDiagram()
  +ModuleInfo()
  +SourceInfo()
  +SourceDiagram()
  +RelationshipDiagram()
  +FunctionDiagram()
  - functionInfoToDiagram()
  - importInfoToDiagram()
  - importInfoToRelationships()
  +toFunctionalProgrammingDiagram()
  - functionToMermaid()
  - entityToMermaid()
  - relationshipToMermaid()
  - noDuplicateFunctionDiagram()
  - mergeFunctionDiagrams()
  +mergeSourceDiagrams()
  +toFunctionalProgrammingMermaid()
}
class `index.ts`{
  +cmdGenerateTypedocAction()
  +cmdParseAction()
  +Commanding()
}
class `io-sfx.ts`{
  +readFile()
  +writeFile()
  +mkdir()
  +toTypedocApiMd()
  +GenerateTypedocActionOpts()
  +RunnerContext()
  +TypedocJson()
  - readTypedocJson()
  - writeApiMd()
  - createDocDir()
  +updateAll()
}
class `markdown-api.ts`{
  +markdownToString()
  +GenerateTypedocActionOpts()
  +MdSection()
  +Parameter()
  +TypedocChild()
  +TypedocJson()
  - apiFilename()
  - parameterToString()
  - functionToMdSection()
  - variableToMdSection()
  - titleToRef()
  +toTypedocApiMd()
}
class `markdown-internal.ts`{
  +toFunctionalProgrammingDiagram()
  +toFunctionalProgrammingMermaid()
  +markdownToString()
  +MdDocument()
  +MdSection()
  +ModuleInfo()
  +toMarkdownInternal()
}
class `markdown.ts`{
  +MdDocument()
  +MdSection()
  - findHeader()
  - getMainSection()
  - discardHeader2()
  - linesToSection()
  - detectSecondaryHeader()
  - getSecondarySections()
  - keepHeaderBody()
  +parseMarkdown()
  - sectionToString()
  +markdownToString()
}
class `model.ts`{
}
class `parse-action.ts`{
  +writeFile()
  +mkdir()
  +toMarkdownInternal()
  +ParseActionOpts()
  +RunnerContext()
  +createProject()
  +parseProject()
  - createDocDir()
  - generateInternalMd()
  +parseAction()
}
class `parser-model.ts`{
}
class `term-formatter.ts`{
  +ErrTermFormatterParams()
  +TermFormatterFormat()
  +TermFormatterParams()
  - simplifyObj()
  - simplifyJson()
  - toJsonish()
  +basicFormatter()
  +errorFormatter()
}
class `ts-parser.ts`{
  +Project()
  +SourceFile()
  +ImportDeclaration()
  +FunctionDeclaration()
  +VariableDeclaration()
  +FunctionInfo()
  +ImportInfo()
  +ModuleInfo()
  +SourceInfo()
  - extractImportInfo()
  - toUniqueStringArray()
  - extractFunctionInfo()
  - extractFunctionExpressionInfo()
  +createProject()
  - isFunctionInfo()
  +parseTsContent()
  +parseProject()
}
class `typedoc-json-model.ts`{
}
class `version.ts`{
}
`client.ts`-->`./index.js`
`commanding-action.ts`-->`./io-sfx.js`
`commanding-action.ts`-->`./model.js`
`commanding-action.ts`-->`./model.js`
`commanding-action.ts`-->`./model.js`
`commanding-action.ts`-->`./model.js`
`commanding-action.ts`-->`./model.js`
`commanding-action.ts`-->`./parse-action.js`
`commanding-data.ts`-->`./model.js`
`commanding-data.ts`-->`./model.js`
`commanding-data.ts`-->`./model.js`
`commanding-helper.ts`-->`node:path`
`commanding-helper.ts`-->`commander`
`commanding-helper.ts`-->`./model.js`
`commanding.ts`-->`commander`
`commanding.ts`-->`./commanding-data.js`
`commanding.ts`-->`./commanding-data.js`
`commanding.ts`-->`./commanding-helper.js`
`commanding.ts`-->`./commanding-helper.js`
`commanding.ts`-->`./env-helper.js`
`commanding.ts`-->`./feature-helper.js`
`commanding.ts`-->`./model.js`
`commanding.ts`-->`./model.js`
`commanding.ts`-->`./model.js`
`commanding.ts`-->`./model.js`
`commanding.ts`-->`./model.js`
`commanding.ts`-->`./model.js`
`commanding.ts`-->`./model.js`
`commanding.ts`-->`./term-formatter.js`
`commanding.ts`-->`./term-formatter.js`
`commanding.ts`-->`./version.js`
`feature-helper.ts`-->`./model.js`
`fp-diagram.ts`-->`./parser-model.js`
`fp-diagram.ts`-->`./parser-model.js`
`fp-diagram.ts`-->`./parser-model.js`
`fp-diagram.ts`-->`./parser-model.js`
`fp-diagram.ts`-->`./parser-model.js`
`fp-diagram.ts`-->`./parser-model.js`
`index.ts`-->`./commanding-action.js`
`index.ts`-->`./commanding-action.js`
`index.ts`-->`./commanding.js`
`io-sfx.ts`-->`node:fs/promises`
`io-sfx.ts`-->`node:fs/promises`
`io-sfx.ts`-->`node:fs/promises`
`io-sfx.ts`-->`./markdown-api.js`
`io-sfx.ts`-->`./model.js`
`io-sfx.ts`-->`./model.js`
`io-sfx.ts`-->`./typedoc-json-model.js`
`markdown-api.ts`-->`./markdown.js`
`markdown-api.ts`-->`./model.js`
`markdown-api.ts`-->`./model.js`
`markdown-api.ts`-->`./typedoc-json-model.js`
`markdown-api.ts`-->`./typedoc-json-model.js`
`markdown-api.ts`-->`./typedoc-json-model.js`
`markdown-internal.ts`-->`./fp-diagram.js`
`markdown-internal.ts`-->`./fp-diagram.js`
`markdown-internal.ts`-->`./markdown.js`
`markdown-internal.ts`-->`./model.js`
`markdown-internal.ts`-->`./model.js`
`markdown-internal.ts`-->`./parser-model.js`
`markdown.ts`-->`./model.js`
`markdown.ts`-->`./model.js`
`parse-action.ts`-->`node:fs/promises`
`parse-action.ts`-->`node:fs/promises`
`parse-action.ts`-->`./markdown-internal.js`
`parse-action.ts`-->`./model.js`
`parse-action.ts`-->`./model.js`
`parse-action.ts`-->`./ts-parser.js`
`parse-action.ts`-->`./ts-parser.js`
`term-formatter.ts`-->`./model.js`
`term-formatter.ts`-->`./model.js`
`term-formatter.ts`-->`./model.js`
`ts-parser.ts`-->`ts-morph`
`ts-parser.ts`-->`ts-morph`
`ts-parser.ts`-->`ts-morph`
`ts-parser.ts`-->`ts-morph`
`ts-parser.ts`-->`ts-morph`
`ts-parser.ts`-->`./parser-model.js`
`ts-parser.ts`-->`./parser-model.js`
`ts-parser.ts`-->`./parser-model.js`
`ts-parser.ts`-->`./parser-model.js`
```
