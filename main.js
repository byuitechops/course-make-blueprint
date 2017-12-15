/*eslint-env node, es6*/
/*eslint no-console:1*/


/* Module Description */
/* Makes the current course a blueprint course*/

/* Put dependencies here */
const canvas = require('canvas-wrapper');

module.exports = (course, stepCallback) => {
    course.addModuleReport('course-make-blueprint');

    /* Don't run if it's not an online course */
    if (course.settings.online === false) {
        course.info.isBlueprint = false; // should this be determined earlier?
        course.success('course-make-blueprint', 'course-make-blueprint successfully determined course should not be made a blueprint');
        stepCallback(null, course);
        return;
    }

    // make the course a blueprint
    canvas.put(`/api/v1/courses/${course.info.canvasOU}`, {
        'course[blueprint]': true
    }, (err, res) => {
        if (err) {
            course.throwErr('course-make-blueprint', err);
            stepCallback(null, course);
            return;
        }
        course.info.isBlueprint = true;
        course.success('course-make-blueprint', `${course.info.courseName} is now a blueprint course`);
        stepCallback(null, course);
    });
};
