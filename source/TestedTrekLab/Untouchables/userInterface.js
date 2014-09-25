UserInterface = function(commandName, commandParameter, target) {
    this.commandName = commandName;
    this.commandParameter = commandParameter;
    this.target = target;
};

UserInterface.prototype = {
    writeLine: function(message) {
        var paragraph = $("<p></p>");
        paragraph.text(message);
        $("#dialogue").append(paragraph);
    },
    parameter: function (parameterName) {
        if(parameterName === "command") {
            return this.commandName;
        }
        return this.commandParameter;
    },
    variable: function(variableName) {
        if(variableName === "target") {
            return this.target;
        }
        throw "Unknown variable " + variableName;
    }
};
