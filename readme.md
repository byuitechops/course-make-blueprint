# Course Make Blueprint
### *Package Name*: course-make-blueprint
### *Child Type*: Post-import
### *Platform*: Online
### *Required*: Required

This child module is built to be used by the Brigham Young University - Idaho D2L to Canvas Conversion Tool. It utilizes the standard `module.exports => (course, stepCallback)` signature and uses the Conversion Tool's standard logging functions. You can view extended documentation [Here](https://github.com/byuitechops/d2l-to-canvas-conversion-tool/tree/master/documentation).

## Purpose

This child module makes the new Canvas Course a blueprint course. It enables locking by object type and enables locking points & content where appropriate.

## How to Install

```
npm install course-make-blueprint
```

## Run Requirements
This child module requires the following fields in the course.info object:
* `canvasOU`

## Options
| Option | Values | Description |
|--------|--------|-------------|
|online| true/false | must be set to true for module to run|

## Outputs
| Option | Type | Location |
|--------|--------|-------------|
|isBlueprint | Bool | course.info|
|lockingEnabled | Bool | course.info|

## Process

Describe in steps how the module accomplishes its goals.

1. Enable blueprint setting in Canvas
2. Enable locking items by object
3. Enable locking points & content on all obj types

## Log Categories
Categories used in logging data in this module.

- Enable Blueprint
- General Locked Objects Enabled

## Requirements

Make the course a blueprint course and enable locking items so blueprint-lock-items can run