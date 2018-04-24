/* Dependencies */
const tap = require('tap');
const canvas = require('canvas-wrapper');

module.exports = (course, callback) => {
    tap.test('child-template', (test) => {

        canvas.get(`/api/v1/courses/${course.info.canvasOU}`, (err, courseArr) => {
            if (err) {
                course.error(err);
                test.end();
            }

            test.ok(courseArr[0].blueprint, true);
            test.end();
        });


    });

    callback(null, course);
};