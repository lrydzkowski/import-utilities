"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = __importDefault(require("ava"));
var build_update_item_mutation_1 = require("./build-update-item-mutation");
ava_1.default('update mutation for product', function (t) {
    var input = {
        vatTypeId: '1234',
        name: 'Cool Product',
        variants: [
            {
                isDefault: true,
                sku: 'cool-product',
                name: 'Cool Product',
            },
        ],
    };
    var got = build_update_item_mutation_1.buildUpdateItemMutation('1234', input, 'product', 'en').replace(/ /g, '');
    var want = "\n    mutation {\n      product {\n        update (\n          id: \"1234\",\n          input: {\n            vatTypeId: \"1234\",\n            name: \"Cool Product\",\n            variants: [\n              {\n                isDefault: true,\n                sku: \"cool-product\",\n                name: \"Cool Product\"\n              }\n            ],\n            components: []\n          },\n          language: \"en\"\n        ) {\n          id\n          name\n        }\n      }\n    }\n  "
        .replace(/\n/g, '')
        .replace(/ /g, '');
    t.is(got, want, 'mutation string should match');
});
ava_1.default('update mutation for document', function (t) {
    var input = {
        name: 'Cool Document',
    };
    var got = build_update_item_mutation_1.buildUpdateItemMutation('1234', input, 'document', 'en').replace(/ /g, '');
    var want = "\n    mutation {\n      document {\n        update (\n          id: \"1234\",\n          input: {\n            name: \"Cool Document\",\n            components: []\n          },\n          language: \"en\"\n        ) {\n          id\n          name\n        }\n      }\n    }\n  "
        .replace(/\n/g, '')
        .replace(/ /g, '');
    t.is(got, want, 'mutation string should match');
});
ava_1.default('update mutation for folder', function (t) {
    var input = {
        name: 'Cool Folder',
    };
    var got = build_update_item_mutation_1.buildUpdateItemMutation('1234', input, 'folder', 'en').replace(/ /g, '');
    var want = "\n    mutation {\n      folder {\n        update (\n          id: \"1234\",\n          input: {\n            name: \"Cool Folder\",\n            components: []\n          },\n          language: \"en\"\n        ) {\n          id\n          name\n        }\n      }\n    }\n  "
        .replace(/\n/g, '')
        .replace(/ /g, '');
    t.is(got, want, 'mutation string should match');
});
ava_1.default('update mutation for items with components', function (t) {
    var propertiesTableComponent = {
        propertiesTable: {
            sections: [
                {
                    title: 'Properties',
                    properties: [
                        {
                            key: 'Coolness',
                            value: '100%',
                        },
                    ],
                },
            ],
        },
    };
    var locationComponent = {
        location: {
            lat: 123,
            long: 123,
        },
    };
    var input = {
        name: 'Cool Folder',
        components: {
            properties: propertiesTableComponent,
            location: locationComponent,
        },
    };
    var got = build_update_item_mutation_1.buildUpdateItemMutation('1234', input, 'folder', 'en').replace(/ /g, '');
    var want = "\n    mutation {\n      folder {\n        update (\n          id: \"1234\",\n          input: {\n            name: \"Cool Folder\",\n            components: [\n              {\n                propertiesTable: {\n                  sections: [\n                    {\n                      title: \"Properties\",\n                      properties: [\n                        {\n                          key: \"Coolness\",\n                          value: \"100%\"\n                        }\n                      ]\n                    }\n                  ]\n                },\n                componentId: \"properties\"\n              },\n              {\n                location: {\n                  lat: 123,\n                  long: 123\n                },\n                componentId: \"location\"\n              }\n            ]\n          },\n          language: \"en\"\n        ) {\n          id\n          name\n        }\n      }\n    }\n  "
        .replace(/\n/g, '')
        .replace(/ /g, '');
    t.is(got, want, 'mutation string should match');
});
ava_1.default('update mutation for items with content chunk component', function (t) {
    var locationComponent = {
        componentId: 'location',
        location: {
            lat: 123,
            long: 123,
        },
    };
    var numericComponent = {
        componentId: 'numeric',
        numeric: {
            number: 123,
        },
    };
    var chunkComponent = {
        contentChunk: {
            chunks: [[locationComponent, numericComponent]],
        },
    };
    var input = {
        name: 'Cool Folder',
        components: {
            chunk: chunkComponent,
        },
    };
    var got = build_update_item_mutation_1.buildUpdateItemMutation('1234', input, 'folder', 'en').replace(/ /g, '');
    var want = "\n    mutation {\n      folder {\n        update (\n          id: \"1234\",\n          input: {\n            name: \"Cool Folder\",\n            components: [\n              {\n                contentChunk: {\n                  chunks: [\n                    [\n                      {\n                        componentId: \"location\",\n                        location: {\n                          lat: 123,\n                          long: 123\n                        }\n                      },\n                      {\n                        componentId: \"numeric\",\n                        numeric: {\n                          number: 123\n                        }\n                      }\n                    ]\n                  ]\n                },\n                componentId: \"chunk\"\n              }\n            ]\n          },\n          language: \"en\"\n        ) {\n          id\n          name\n        }\n      }\n    }\n  "
        .replace(/\n/g, '')
        .replace(/ /g, '');
    t.is(got, want, 'mutation string should match');
});
