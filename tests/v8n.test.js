import v8n from '../lib/v8n.esm.js';

// regex
test('valid regex dd/mm/yyyy > 11/11/2020', () => {
    expect(
        v8n()
            .regex(/^(\d{2})\/(\d{2})\/(\d{4})$/)
            .test('11/11/2020')
    ).toBe(true);
});
test('invalid regex dd/mm/yyyy > 11/11', () => {
    expect(
        v8n()
            .regex(/^(\d{2})\/(\d{2})\/(\d{4})$/)
            .test('11/11')
    ).toBe(false);
});

// date
test('valid date dd/mm/yyyy > 11/11/2020', () => {
    expect(v8n().date().test('11/11/2020')).toBe(true);
});
test('valid date dd/mm/yyyy > 29/02/2021', () => {
    expect(v8n().date().test('29/02/2021')).toBe(false);
});
test('invalid date dd/mm/yyyy > 33/11/2020', () => {
    expect(v8n().date().test('33/11/2020')).toBe(false);
});
test('invalid date dd/mm/yyyy > 28/13/2020', () => {
    expect(v8n().date().test('28/13/2020')).toBe(false);
});
test('invalid date dd/mm/yyyy > 11/11/1800', () => {
    expect(v8n().date().test('11/11/1800')).toBe(false);
});
test('invalid date dd/mm/yyyy > 11/11/2100', () => {
    expect(v8n().date().test('11/11/2100')).toBe(false);
});
test('invalid date dd/mm/yyyy > 11/11', () => {
    expect(v8n().date().test('11/11')).toBe(false);
});

// email
test('valid email > team@99xp.org', () => {
    expect(v8n().email().test('team@99xp.org')).toBe(true);
});
test('valid email 2 > team@99xp.newdomain', () => {
    expect(v8n().email().test('team@99xp.newdomain')).toBe(true);
});
test('invalid email > team@99xp', () => {
    expect(v8n().email().test('team@99xp')).toBe(false);
});

// string alpha
test('string > loremipsum', () => {
    expect(v8n().stringAlpha().test('loremipsum')).toBe(false);
});
test('string > loremipsum123', () => {
    expect(v8n().stringAlpha().test('loremipsum123')).toBe(true);
});

// fullname
test('valid fullname > bruno foggia', () => {
    expect(v8n().fullname().test('bruno foggia')).toBe(true);
});
test('valid fullname 2 > kaitlyn maria', () => {
    expect(v8n().fullname().test('kaitlyn maria')).toBe(true);
});
test('valid fullname 3 > karen schmidt > finishing with space', () => {
    expect(v8n().fullname().test('karen schmidt  ')).toBe(true);
});
test('invalid fullname > bruno', () => {
    expect(v8n().fullname().test('bruno')).toBe(false);
});

// shortname
test('valid shortname > bruno foggia', () => {
    expect(v8n().shortname().test('bruno h foggia')).toBe(true);
});
test('valid shortname 2 > kaitlyn maria', () => {
    expect(v8n().shortname().test('kaitlyn maria')).toBe(true);
});
test('valid shortname 3 > karen schmidt > finishing with space', () => {
    expect(v8n().shortname().test('karen schmidt  ')).toBe(true);
});
test('valid shortname nubank like > j louise', () => {
    expect(v8n().shortname().test('j louise')).toBe(true);
});
test('invalid shortname > bruno', () => {
    expect(v8n().shortname().test('bruno')).toBe(false);
});

// password match
test('passwords match', () => {
    expect(
        v8n()
            .passwordMatch()
            .test([
                'string123',
                'password_1',
                {
                    password: 'string123',
                    password_1: 'string123',
                },
            ])
    ).toBe(false);
});
test('passwords not match', () => {
    expect(
        v8n()
            .passwordMatch()
            .test([
                'string123',
                'password_1',
                {
                    password: 'string1234',
                    password_1: 'string123',
                },
            ])
    ).toBe(false);
});

// CPF
test('valid CPF', () => {
    expect(v8n().cpf().test('244.592.250-00')).toBe(true);
});
test('invalid CPF', () => {
    expect(v8n().cpf().test('444.592.250-00')).toBe(false);
});
test('over chars CPF', () => {
    expect(v8n().cpf().test('444.592.250-001')).toBe(false);
});

// CNPJ
test('valid CNPJ', () => {
    expect(v8n().cnpj().test('24.936.499/0001-01')).toBe(true);
});
test('invalid CNPJ', () => {
    expect(v8n().cnpj().test('24.936.499/0001-00')).toBe(false);
});
test('over chars CNPJ', () => {
    expect(v8n().cnpj().test('24.936.499/0001-001')).toBe(false);
});

// CPFCNPJ
test('valid CPF on CPFCNPJ method', () => {
    expect(v8n().cpfcnpj().test('244.592.250-00')).toBe(true);
});
test('invalid CPF on CPFCNPJ method', () => {
    expect(v8n().cpfcnpj().test('444.592.250-00')).toBe(false);
});
test('less chars CPF on CPFCNPJ method', () => {
    expect(v8n().cpfcnpj().test('444.592.250-0')).toBe(false);
});
test('valid CNPJ on CPFCNPJ method', () => {
    expect(v8n().cpfcnpj().test('24.936.499/0001-01')).toBe(true);
});
test('invalid CNPJ on CPFCNPJ method', () => {
    expect(v8n().cpfcnpj().test('24.936.499/0001-00')).toBe(false);
});
test('over chars CNPJ on CPFCNPJ method', () => {
    expect(v8n().cpfcnpj().test('24.936.499/0001-001')).toBe(false);
});

// Credit Card
test('valid Credit Card', () => {
    expect(v8n().creditcard().test('5201561050025011')).toBe(true);
});
test('invalid Credit Card', () => {
    expect(v8n().creditcard().test('5201561050025099')).toBe(false);
});

// Credit Card ValidTo
test('valid Credit Card validTo > 01/09/2030', () => {
    expect(
        v8n()
            .validTo(true, [new Date().getFullYear() + 10])
            .test('01/09/2030')
    ).toBe(true);
});
test('invalid Credit Card validTo > 09/2099', () => {
    expect(
        v8n()
            .validTo(true, [new Date().getFullYear() + 10])
            .test('09/2099')
    ).toBe(false);
});
test('invalid Credit Card validTo > 09/2019', () => {
    expect(v8n().validTo(true).test('09/2019')).toBe(false);
});
test('invalid Credit Card validTo > 09/24', () => {
    expect(v8n().validTo(true).test('09/24')).toBe(false);
});

// Renavam
test('valid renavam', () => {
    expect(v8n().renavam().test('123456789')).toBe(true);
});
test('invalid renavam', () => {
    expect(v8n().renavam().test('123123123')).toBe(false);
});

// BR Phone
test('Valid DDD+Phone > 11912345678', () => {
    expect(v8n().brphone().test('11912345678')).toBe(true);
});
test('invalid DDD+Phone > 912345678', () => {
    expect(v8n().brphone().test('912345678')).toBe(false);
});
