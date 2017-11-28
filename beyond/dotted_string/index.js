'use strict';

var idIqr = 'iq#0.iqr#1/0';
var idAu0 = 'iq#0.iqr#1/0.au#2/0';

var withoutNesteds = {state: stateWithoutNesteds(), dsl: dslIqrWithoutNesteds()};
var withNesteds = {state: stateWithNesteds(), dsl: dslIqrWithNesteds()};

// xxx(idIqr, stateObjWithoutNesteds, []) = ['iq#0.iqr#1/0']
// xxx(idIqr, stateObjWithNesteds, []) = ['iq#0.iqr#1/0.au#2/0', 'iq#0.iqr#1/0.au#2/1', 'iq#0.iqr#1/0']

var stateObjWithoutNesteds = stateWithoutNesteds();
stateObjWithoutNesteds.dsl = dslIqrWithoutNesteds();

var stateObjWithNesteds = stateWithNesteds();
stateObjWithNesteds.dsl = dslIqrWithNesteds();

xxx(idIqr, stateObjWithoutNesteds, []);
xxx(idIqr, stateObjWithNesteds, []);


function xxx(id, state, acc) {
    if (containsRepeatableContentTypes(id, state.dsl)) {

        alert('no nesteds');
        return;
    }
    alert('nesteds');
    return acc.concat([id]);
}

function containsRepeatableContentTypes(id, dsl) {
    return dsl.content_type.form.some(function (item) {
        return item.content_type && item.content_type.repeatable;
    });
}

function dslIqrWithoutNesteds() {
    return {
        id: 'result',
        type: 'content_type',
        content_type: {
            type: 'iqr',
            repeatable: {},
            form: [
                {
                    id: 'title',
                    type: 'widget',
                    widget: {},
                },
                {
                    id: 'image',
                    type: 'widget',
                    widget: {},
                }
            ]
        }
    };
}

function dslIqrWithNesteds() {
    return {
        id: 'result',
        type: 'content_type',
        content_type: {
            type: 'iqr',
            repeatable: {},
            form: [
                {
                    id: 'title',
                    type: 'widget',
                    widget: {},
                },
                {
                    id: 'image',
                    type: 'widget',
                    widget: {},
                },
                {
                    id: 'creator',
                    type: 'content_type',
                    content_type: {
                        type: 'au',
                        repeatable: {},
                        form: [
                            {
                                id: 'title',
                                type: 'widget',
                                widget: {},
                            },
                            {
                                id: 'image',
                                type: 'widget',
                                widget: {},
                            },
                        ]
                    }
                }
            ]
        },
    };
}

function stateWithoutNesteds() {
    return {
        iqr: {
            'iq#0.iqr#1/0': [
                'iq#0.iqr#1/0.it#0',
                'iq#0.iqr#1/0.iu#1',
            ],
        },
    };
}

function stateWithNesteds() {
    return {
        iqr: {
            'iq#0.iqr#1/0': [
                'iq#0.iqr#1/0.it#0',
                'iq#0.iqr#1/0.iu#1',
                'iq#0.iqr#1/0.au#2/0',
                'iq#0.iqr#1/0.au#2/1',
            ],
        },
        au: {
            'iq#0.iqr#1/0.au#2/0': [
                'iq#0.iqr#1/0.au#2/0.it#0',
                'iq#0.iqr#1/0.au#2/0.iu#1',
            ],
            'iq#0.iqr#1/0.au#2/1': [
                'iq#0.iqr#1/0.au#2/1.it#0',
                'iq#0.iqr#1/0.au#2/1.iu#1',
            ],
        }
    };
}
