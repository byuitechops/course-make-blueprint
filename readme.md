# Description #
This is a child module of the d2l-to-canvas-conversion-tool. It is a postImport module used to make the new canvas course a blueprint course. 
It uses the properties in the settings and info sections of the course object to determine if the course should be converted to a blueprint course or not.

It also enables locking by object type and enables locking points & content where appropriate. It adds a boolean value to course.info.lockByObj to notify future child modules that it ran successfully
