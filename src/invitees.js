const invitees = [
  { id: 1, name: 'Danci Crina', fromWho: 'groom', numberOfNights: 2 },
  { id: 2, name: 'Danci Andrei', fromWho: 'groom', numberOfNights: 2 },
  { id: 3, name: 'Danci Mariana', fromWho: 'groom' },
  { id: 4, name: 'Danci Vasile', fromWho: 'groom' },
  { id: 5, name: 'Vișovan Aurelia', fromWho: 'groom', numberOfNights: 2 },
  { id: 6, name: 'Çakmur Can', fromWho: 'groom', notes: 'prietenul Aureliei Vișovan', numberOfNights: 2 },
  { id: 7, name: 'Mîcnea Iulian', fromWho: 'groom', numberOfNights: 2 },
  { id: 8, name: 'Mîcnea Diana', fromWho: 'groom', notes: 'prietena lui Iulian Mîcnea', numberOfNights: 2 },
  { id: 9, name: 'Ardelean Ramona', fromWho: 'groom' },
  { id: 10, name: 'Ardelean Petrică', fromWho: 'groom' },
  { id: 11, name: 'Balasz Doina', fromWho: 'groom' },
  { id: 12, name: 'Ilnițchi Radu', fromWho: 'groom', notes: 'soțul Doinei Balasz' },
  { id: 13, name: 'Balasz Paul', fromWho: 'groom' },
  { id: 14, name: 'Balasz Robert', fromWho: 'groom' },
  { id: 15, name: 'Teleptean Vasi ', fromWho: 'groom' },
  { id: 16, name: 'Clemcovici Melisa', fromWho: 'groom', notes: 'logodnica lui Teleptean Vasi' },
  { id: 17, name: 'Hajdu Romina', fromWho: 'groom', notes: '"Romina Carpiuc"' },
  { id: 18, name: 'Hajdu Istvan', fromWho: 'groom' },
  { id: 19, name: 'Pr. Ardelean Cornel', fromWho: 'groom' },
  { id: 20, name: 'Ardelean Niculina', fromWho: 'groom' },
  { id: 21, name: 'Haidu Romulus (Romi)', fromWho: 'groom' },
  { id: 22, name: 'Haidu Diana', fromWho: 'groom' },
  { id: 23, name: 'Haidu Luca', fromWho: 'groom', notes: 'copil cls 5-a' },
  { id: 24, name: 'Basanciuc Ovidiu', fromWho: 'groom' },
  { id: 25, name: 'Basanciuc Ramona', fromWho: 'groom' },
  { id: 26, name: 'Mursa Cătălin', fromWho: 'groom' },
  { id: 27, name: 'Mursa (Turcan) Valentina', fromWho: 'groom' },
  { id: 28, name: 'Spiridon Iulian Marian', fromWho: 'groom' },
  { id: 29, name: 'Spiridon Ionela', fromWho: 'groom', notes: '"Chifor Ionela"' },
  { id: 30, name: 'Godjea Gelu', fromWho: 'groom' },
  { id: 31, name: 'Godjea Flavia', fromWho: 'groom' },
  { id: 97, name: 'Timoftoaie Georgiana', notes: '+copil Iustin 3 ani', numberOfNights: 2 },
  { id: 98, name: 'Timoftoaie Petru', notes: '', numberOfNights: 2 },
  { id: 99, name: 'Timoftoaie Leonardo', notes: 'copil - 10 ani', numberOfNights: 2 },
  { id: 100, name: 'Gherasim Mirabela', notes: '' },
  { id: 101, name: 'Carcea Ionuț', notes: 'prietenul Mirabelei Gherasim' },
  { id: 102, name: 'Țăruș Andreea', notes: '' },
  { id: 103, name: 'Vieru Ilie', notes: 'prietenul Andreei Țăruș' },
  { id: 104, name: 'Ciobanu Alexandra', notes: '"Alexandra Manolache" + bebe 4 luni', numberOfNights: 2 },
  { id: 105, name: 'Ciobanu Gheorghiță', notes: '', numberOfNights: 2 },
  { id: 106, name: 'Roșca Daniel', notes: '' },
  { id: 107, name: 'Angheluță Teodora', notes: 'iubita lui Daniel Roșca' },
  { id: 108, name: 'Vrînceanu George', notes: '' },
  { id: 109, name: 'Baroi Arianna', notes: 'iubita lui Vrînceanu George' },
  { id: 110, name: 'Iacob Bogdan', notes: '' },
  { id: 111, name: 'Lupu Maria', notes: 'iubita lui Bogdan Iacob' },
  { id: 114, name: 'Lipovanu Dorin', notes: 'fratele mamei miresei' },
  { id: 116, name: 'Lipovanu Cristina', notes: '+ copil Iustin 3 ani' },
  { id: 117, name: 'Constantiniu Iuliana', notes: '"Coca Marțin"' },
  { id: 118, name: 'Constantiniu Tudor', notes: '' },
  { id: 121, name: 'Lucan Valerica', notes: '' },
  { id: 122, name: 'Cilof Costel', notes: 'iubitul Valericăi Lucan' },
  { id: 123, name: 'Călin Gelu', notes: '' },
  { id: 124, name: 'Călin Valentina', notes: '' },
  { id: 125, name: 'Marțin Elena', notes: '' },
  { id: 126, name: 'Lucan Alexandra', notes: '' },
  { id: 127, name: 'Bodea Andrei Ionuț', notes: 'iubitul Alexandrei Lucan' },
  { id: 128, name: 'Lucan Daniel', notes: '' },
  { id: 129, name: 'Bazga Elena-Petronela', notes: 'iubita lu Daniel Lucan' },
  { id: 130, name: 'Lucan Lenuța', notes: '', numberOfNights: 2 },
  { id: 131, name: 'Lucan Petrișor', numberOfNights: 2, notes: '' },
  { id: 132, name: 'Marțin Gabi', notes: '' },
  { id: 133, name: 'Marțin Călina', notes: '' },
  { id: 134, name: 'Amărculesei Lavinia', notes: '' },
  { id: 135, name: 'Amărculesei Lavinia - iubit', notes: '' },
  { id: 136, name: 'Țuțuianu Iuliana', notes: '"Iuliana Axinte"' },
  { id: 137, name: 'Țuțuianu Ovidiu', notes: '' },
  { id: 138, name: 'Apopei Mălina', notes: '' },
  { id: 139, name: 'Apopei Marius', notes: '' },
  { id: 140, name: 'Rebegia Raluca', notes: '"Raluca Pavel"' },
  { id: 141, name: 'Rebegia Alin', notes: '' },
  { id: 142, name: 'Mandric Gabriela', notes: '"Gabi Andrioaie"' },
  { id: 143, name: 'Mandric Cătălin', notes: '' },
  { id: 144, name: 'Archip Alexandru', notes: '' },
  { id: 145, name: 'Archip Cristina', notes: '' },
  { id: 146, name: 'Luca Petrică', notes: '' },
  { id: 147, name: 'Luca Marinela', notes: '' },
  { id: 148, name: 'Anechitoaie Cristian', notes: '' },
  { id: 149, name: 'Anechitoaie Mariana', notes: '' },
  { id: 150, name: 'Galbin Gheorghe', notes: '' },
  { id: 151, name: 'Galbin Anișoara', notes: '' },
  { id: 152, name: 'Mătase Mihaela', notes: '', numberOfNights: 2 },
  { id: 153, name: 'Mătase Puiu', notes: '', numberOfNights: 2 },
  { id: 156, name: 'Balmuș Cristina-Marinela', notes: '"Cristina Eșanu"' },
  { id: 157, name: 'Balmuș Ionuț', notes: 'soț Cristina Eșanu' },
  { id: 158, name: 'Chelciuc Mihaela', notes: '' },
  { id: 159, name: 'Agache Bogdan', notes: 'iubitul Mihaelei Chelciuc' },
];

export default invitees;
