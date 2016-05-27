import reporter from "../lib/vsoReporter";
import * as sinon from "sinon";
import * as assert from "assert";

describe("VSO Reporter", function() {
    let spy: sinon.SinonSpy;
    
    beforeEach(function() {
        spy = sinon.stub(console, 'log');
    });

    afterEach(function() {
        spy.restore();
    });

    it("handles no failures", function() {
        reporter([]);
        assert.equal(true, spy.notCalled);
    });

    it("formats failure", function() {
        // Arrange
        const failure = {
            name: "test.ts",
            failure: "rule failure message",
            startPosition:
            {
                line: 0,
                character: 0
            },
            ruleName: "rule-name"
        };

        const expectedResult =
            "##vso[task.logissue type=error;sourcepath=test.ts;linenumber=1;columnnumber=1;code=rule-name;]rule failure message";

        // Act
        const actualResult = reporter([failure]);

        // Assert
        assert.equal(true, spy.calledOnce);
        assert.equal(true, spy.calledWith(expectedResult));
    });

    it("formats multiple failures", function() {
        // Arrange
        const failures = [
            { name: "test.ts", failure: "first failure message", startPosition: { line: 0, character: 0 }, ruleName: "first-name" },
            { name: "test.ts", failure: "second failure message", startPosition: { line: 1, character: 16 }, ruleName: "second-name" },
            { name: "test.ts", failure: "last failure message", startPosition: { line: 9, character: 57 }, ruleName: "last-name" }
        ];

        const expectedResults = [
            "##vso[task.logissue type=error;sourcepath=test.ts;linenumber=1;columnnumber=1;code=first-name;]first failure message",
            "##vso[task.logissue type=error;sourcepath=test.ts;linenumber=2;columnnumber=17;code=second-name;]second failure message",
            "##vso[task.logissue type=error;sourcepath=test.ts;linenumber=10;columnnumber=58;code=last-name;]last failure message"];

        // Act
        const actualResult = reporter(failures);

        // Assert
        assert.equal(true, spy.calledWith(expectedResults[0]));
        assert.equal(true, spy.calledWith(expectedResults[1]));
        assert.equal(true, spy.calledWith(expectedResults[2]));
    });

    it("emits warning if `options.emitError` is `false`", function() {
        // Arrange
        const failure = {
            name: "test.ts",
            failure: "rule failure message",
            startPosition:
            {
                line: 0,
                character: 0
            },
            ruleName: "rule-name"
        };

        const expectedResult =
            "##vso[task.logissue type=warning;sourcepath=test.ts;linenumber=1;columnnumber=1;code=rule-name;]rule failure message";

        // Act
        const actualResult = reporter([failure], undefined, { emitError: false });

        // Assert
        assert.equal(true, spy.calledOnce);
        assert.equal(true, spy.calledWith(expectedResult));
    });
});
