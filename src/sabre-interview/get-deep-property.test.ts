import { getDeepProperty } from './get-deep-property';

describe('getDeepProperty is a function', () => {
    test('Input 1', () => {
        const data = {
            person: {
            name: {
                first: 'FirstName',
                middleInitial: 'I',
                lastName: 'LastName',
            },
            },
        };
        expect(getDeepProperty(data, 'person.name.lastName')).toBe('LastName');
    });

    test('Input 2', () => {
        const data = {
            person: {
            name: {
                first: 'FirstName',
                middleInitial: 'I',
                lastName: 'LastName',
            },
            address: 'Main street',
            },
        };
        expect(getDeepProperty(data, 'person.address')).toBe('Main street');
    });

    test('Input 3', () => {
        const data = {
            person: {
            name: {
                first: 'FirstName',
                middleInitial: 'I',
                lastName: 'LastName',
            },
            address: 'Main street',
            contact: [
                {
                type: 'Mobile',
                number: '123',
                },
            ],
            },
        };
        expect(getDeepProperty(data, 'person.contact[0]')).toEqual({
            type: 'Mobile',
            number: '123',
        });
    });

    test('Input 4', () => {
        const data = {
            person: {
            name: {
                first: 'FirstName',
                middleInitial: 'I',
                lastName: 'LastName',
            },
            address: 'Main street',
            contact: [
                {
                type: 'Mobile',
                number: '123',
                },
            ],
            },
        };
        expect(getDeepProperty(data, 'asxaperson.contact[0]', 'Not Found')).toBe('Not Found');
    });
});