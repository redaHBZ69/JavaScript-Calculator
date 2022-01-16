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
});
import("chalk").then((chalk) => {
    console.log(`${new chalk.Chalk().redBright("====================================================================================")}
Welcome to the JavaScript calculator. Please use ${new chalk.Chalk().redBright("JavaScript Math")} syntax to calculate.
\nNo need to put ${new chalk.Chalk().greenBright("Math.")} infront of Math functions/variables, that is handled automatically.
${new chalk.Chalk().redBright("====================================================================================")}\n`);

    let ans = 0;

    while (true) {
        try {
            let funcBody = `let ans=${ans};`;

            for (const identifier of Object.getOwnPropertyNames(Math)) {
                funcBody += `let ${identifier}=Math.${identifier};`;
            }

            const exp = prompt({ value: 0 });

            funcBody += `return ${exp};`;

            const result = new Function(funcBody);

            if (typeof result() !== "number") {
                console.log("Could not compile. Please try again.\n");
                continue;
            }
            console.log(result());
            ans = result();

        } catch (error) {
            console.log("An error occured. Please try again.");
        }
    }
});