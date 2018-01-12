/*eslint-env node, es6*/
/*eslint no-console:1*/


/* Module Description */
/* Makes the current course a blueprint course*/

/* Put dependencies here */
const canvas = require('canvas-wrapper'),
    asyncLib = require('async');

module.exports = (course, stepCallback) => {
    course.addModuleReport('course-make-blueprint');

    /* Don't run if it's not an online course */
    if (course.settings.online === false) {
        course.info.isBlueprint = false; // should this be determined earlier?
        course.success('course-make-blueprint', 'course-make-blueprint successfully determined course should not be made a blueprint');
        stepCallback(null, course);
        return;
    }

    /*********************************
     * START HERE
     * make the course a blueprint 
     **********************************/
    canvas.put(`/api/v1/courses/${course.info.canvasOU}`, {
        'course[blueprint]': true
    }, (err, res) => {
        if (err) {
            course.throwErr('course-make-blueprint', err);
            stepCallback(null, course);
            return;
        }
        course.info.isBlueprint = true;
        course.success('course-make-blueprint', `${course.info.fileName.split('.zip')[0]} is now a blueprint course`);

        /* Enable locking items by object */
        canvas.put(`/api/v1/courses/${course.info.canvasOU}`, {
            'course[use_blueprint_restrictions_by_object_type]': true,
        }, (err) => {
            if (err) {
                course.throwError('blueprint-lock-items', err);
                stepCallback(null, err);
                return;
            }
            course.success('course-make-blueprint', 'Locking items by object type enabled');

            /* Enable locking points & content on all obj types */
            resObj = {
                'course[blueprint_restrictions_by_object_type]': {
                    'assignment': {'content': true, 'points': true},
                    'attachment': {'content': true},
                    'discussion_topic': {'content': true, 'points': true},
                    'quiz': {'content': true, 'points': true},
                    'wiki_page': {'content': true}
                }
            }

            canvas.put(`/api/v1/courses/${course.info.canvasOU}`, resObj, (err, result) => {
                if (err) {
                    course.throwErr('course-make-blueprint', err);
                    stepCallback(null, course);
                    return;
                }
                course.success('course-make-blueprint', 'Content and points locked for all object types');
                stepCallback(null, course);
            });
        });
    });
};