/* Module Description */
/* Makes the current course a blueprint course*/

const canvas = require('canvas-wrapper');

module.exports = (course, stepCallback) => {
    /*********************************
     * START HERE
     * make the course a blueprint 
     **********************************/
    canvas.put(`/api/v1/courses/${course.info.canvasOU}`, {
        'course[blueprint]': true
    }, (err) => {
        if (err) {
            course.error(err);
            stepCallback(null, course);
            return;
        }
        course.newInfo('isBlueprint', true);
        course.log('Enable Blueprint', {'Blueprint Enabled': true});

        /* Enable locking items by object */
        canvas.put(`/api/v1/courses/${course.info.canvasOU}`, {
            'course[use_blueprint_restrictions]': true,
        }, (err) => {
            if (err) {
                course.error(err);
                stepCallback(null, err);
                return;
            }
            /* This property is required for blueprint lock items to run */
            course.newInfo('lockingEnabled', true);
            course.message('General Locked Objects enabled');

            /* Enable locking points & content on all obj types */
            var resObj = {
                'course[blueprint_restrictions]': {
                    'content': true,
                    'points': true,
                    'due_dates': true,
                    'availability_dates': true
                }
            };

            canvas.put(`/api/v1/courses/${course.info.canvasOU}`, resObj, (err) => {
                if (err) {
                    course.error(err);
                    stepCallback(null, course);
                    return;
                }
                course.log('General Locked Objects Enabled', {'Enabled': true});
                stepCallback(null, course);
            });
        });
    });
};