/* jshint esversion: 11 */
const prompt = require("prompt-sync")({
    sigint: true,
    autocomplete: (str) => {
        const commands = Object.getOwnPropertyNames(Math);
        let ret = [];
        for (const cmd of commands) {
            if (cmd.indexOf(str) == 0)
                ret.push(cmd);
        }
        return ret;
    }
}),
    { program } = require("commander");
program.option("-c", "Run the script in compare mode where you can compare 2 values AND calculate");
program.parse();
const opts = program.opts();
import("chalk").then((chalk) => {
    console.log(`${new chalk.Chalk().redBright("====================================================================================")}
Welcome to the JavaScript calculator. Please use ${new chalk.Chalk().redBright("JavaScript Math")} syntax to calculate.
\nNo need to put ${new chalk.Chalk().greenBright("Math.")} infront of Math functions/variables, that is handled automatically.
${new chalk.Chalk().redBright("====================================================================================")}\n`);

    let ans = 0;
    let bool = opts.c ? true : undefined;
    while (true) {
        try {
            let funcBody = `const ans=${ans};const bool=${bool};`;

            for (const identifier of Object.getOwnPropertyNames(Math)) {
                funcBody += `const ${identifier}=Math.${identifier};`;
            }

            const exp = prompt({ value: 0 });
            if(!opts.c && exp.includes("bool")) {
                console.log("Cannot use 'bool' outside of compare mode. Add -c to args");
                continue;
            }
            funcBody += `return ${exp};`;

            const result = new Function(funcBody);

            if (typeof result() !== "number" && (typeof result() !== "boolean" && !opts.c)) {
                console.log("Could not compile. Please try again.\n");
                continue;
            }
            console.log(result());
            typeof result() == "boolean" ? bool = result() : ans = result();



        } catch (error) {
            console.log("An error occured. Please try again.");
        }
    }
});