const typedocExample = {
  id: 0,
  name: 'object-crumble',
  kind: 1,
  kindString: 'Project',
  flags: {},
  originalName: '',
  children: [
    {
      id: 17,
      name: 'mutatorRules',
      kind: 32,
      kindString: 'Variable',
      flags: {},
      sources: [
        {
          fileName: 'obj-mutator.ts',
          line: 35,
          character: 13,
        },
      ],
      type: {
        type: 'array',
        elementType: {
          type: 'reference',
          name: 'CrumbleFieldMutation',
        },
      },
      defaultValue: '...',
    },
    {
      id: 1,
      name: 'abstractObject',
      kind: 64,
      kindString: 'Function',
      flags: {
        isConst: true,
      },
      sources: [
        {
          fileName: 'obj-abstractor.ts',
          line: 58,
          character: 13,
        },
      ],
      signatures: [
        {
          id: 2,
          name: 'abstractObject',
          kind: 4096,
          kindString: 'Call signature',
          flags: {},
          comment: {
            shortText:
              'Convert any object to an abstract representation of the object structure\n```\nabstractObject({name: "Jane"})\n```',
            returns: 'an abstracted object\n',
          },
          parameters: [
            {
              id: 3,
              name: 'rules',
              kind: 32768,
              kindString: 'Parameter',
              flags: {},
              comment: {
                shortText: 'a list of rules',
              },
              type: {
                type: 'array',
                elementType: {
                  type: 'reference',
                  name: 'StringAbstractionRule',
                },
              },
            },
            {
              id: 4,
              name: 'prefix',
              kind: 32768,
              kindString: 'Parameter',
              flags: {},
              comment: {
                shortText: 'a prefix',
              },
              type: {
                type: 'intrinsic',
                name: 'string',
              },
              defaultValue: "''",
            },
          ],
          type: {
            type: 'reflection',
            declaration: {
              id: 5,
              name: '__type',
              kind: 65536,
              kindString: 'Type literal',
              flags: {},
              signatures: [
                {
                  id: 6,
                  name: '__type',
                  kind: 4096,
                  kindString: 'Call signature',
                  flags: {},
                  parameters: [
                    {
                      id: 7,
                      name: 'value',
                      kind: 32768,
                      kindString: 'Parameter',
                      flags: {},
                      type: {
                        type: 'reference',
                        name: 'CrumbleObject',
                      },
                    },
                  ],
                  type: {
                    type: 'array',
                    elementType: {
                      type: 'reference',
                      name: 'CrumbleAbstractedObject',
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    },
    {
      id: 21,
      name: 'anyOfString',
      kind: 64,
      kindString: 'Function',
      flags: {
        isConst: true,
      },
      sources: [
        {
          fileName: 'string-abstractor.ts',
          line: 6,
          character: 13,
        },
      ],
      signatures: [
        {
          id: 22,
          name: 'anyOfString',
          kind: 4096,
          kindString: 'Call signature',
          flags: {},
          parameters: [
            {
              id: 23,
              name: 'name',
              kind: 32768,
              kindString: 'Parameter',
              flags: {},
              type: {
                type: 'intrinsic',
                name: 'string',
              },
            },
            {
              id: 24,
              name: 'options',
              kind: 32768,
              kindString: 'Parameter',
              flags: {},
              type: {
                type: 'array',
                elementType: {
                  type: 'intrinsic',
                  name: 'string',
                },
              },
            },
          ],
          type: {
            type: 'reflection',
            declaration: {
              id: 25,
              name: '__type',
              kind: 65536,
              kindString: 'Type literal',
              flags: {},
              signatures: [
                {
                  id: 26,
                  name: '__type',
                  kind: 4096,
                  kindString: 'Call signature',
                  flags: {},
                  parameters: [
                    {
                      id: 27,
                      name: 'value',
                      kind: 32768,
                      kindString: 'Parameter',
                      flags: {},
                      type: {
                        type: 'intrinsic',
                        name: 'string',
                      },
                    },
                  ],
                  type: {
                    type: 'intrinsic',
                    name: 'string',
                  },
                },
              ],
            },
          },
        },
      ],
    },
    {
      id: 8,
      name: 'mutateObject',
      kind: 64,
      kindString: 'Function',
      flags: {
        isConst: true,
      },
      sources: [
        {
          fileName: 'obj-mutator.ts',
          line: 94,
          character: 13,
        },
      ],
      signatures: [
        {
          id: 9,
          name: 'mutateObject',
          kind: 4096,
          kindString: 'Call signature',
          flags: {},
          parameters: [
            {
              id: 10,
              name: 'rules',
              kind: 32768,
              kindString: 'Parameter',
              flags: {},
              type: {
                type: 'array',
                elementType: {
                  type: 'reference',
                  name: 'CrumbleFieldMutation',
                },
              },
            },
          ],
          type: {
            type: 'reflection',
            declaration: {
              id: 11,
              name: '__type',
              kind: 65536,
              kindString: 'Type literal',
              flags: {},
              signatures: [
                {
                  id: 12,
                  name: '__type',
                  kind: 4096,
                  kindString: 'Call signature',
                  flags: {},
                  parameters: [
                    {
                      id: 13,
                      name: 'mutation',
                      kind: 32768,
                      kindString: 'Parameter',
                      flags: {},
                      type: {
                        type: 'reference',
                        name: 'OakObjApplicableMutation',
                      },
                    },
                  ],
                  type: {
                    type: 'reflection',
                    declaration: {
                      id: 14,
                      name: '__type',
                      kind: 65536,
                      kindString: 'Type literal',
                      flags: {},
                      signatures: [
                        {
                          id: 15,
                          name: '__type',
                          kind: 4096,
                          kindString: 'Call signature',
                          flags: {},
                          parameters: [
                            {
                              id: 16,
                              name: 'content',
                              kind: 32768,
                              kindString: 'Parameter',
                              flags: {},
                              type: {
                                type: 'reference',
                                name: 'CrumbleObject',
                              },
                            },
                          ],
                          type: {
                            type: 'reference',
                            name: 'CrumbleObject',
                          },
                        },
                      ],
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    },
    {
      id: 18,
      name: 'someUrl',
      kind: 64,
      kindString: 'Function',
      flags: {
        isConst: true,
      },
      sources: [
        {
          fileName: 'string-abstractor.ts',
          line: 3,
          character: 13,
        },
      ],
      signatures: [
        {
          id: 19,
          name: 'someUrl',
          kind: 4096,
          kindString: 'Call signature',
          flags: {},
          parameters: [
            {
              id: 20,
              name: 'value',
              kind: 32768,
              kindString: 'Parameter',
              flags: {},
              type: {
                type: 'intrinsic',
                name: 'string',
              },
            },
          ],
          type: {
            type: 'union',
            types: [
              {
                type: 'intrinsic',
                name: 'string',
              },
              {
                type: 'literal',
                value: false,
              },
            ],
          },
        },
      ],
    },
  ],
  groups: [
    {
      title: 'Variables',
      kind: 32,
      children: [17],
    },
    {
      title: 'Functions',
      kind: 64,
      children: [1, 21, 8, 18],
    },
  ],
  sources: [
    {
      fileName: 'index.ts',
      line: 1,
      character: 0,
    },
  ],
};

export const typedocExampleJson = JSON.stringify(typedocExample);
