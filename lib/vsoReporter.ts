export default function vsoReporter(output: any, file?: any, options?: any): void {
    const logType = options && !options.emitError ? "warning" : "error";

    for (let i = 0, len = output.length; i < len; i++) {
        const failure = output[i];

        const failureString = failure.failure;
        const fileName = failure.name;
        const line = failure.startPosition.line + 1;
        const character = failure.startPosition.character + 1;
        const code = failure.ruleName;

        const properties = `sourcepath=${fileName};linenumber=${line};columnnumber=${character};code=${code};`;

        console.log(`##vso[task.logissue type=${logType};${properties}]${failureString}`);
    }
}
