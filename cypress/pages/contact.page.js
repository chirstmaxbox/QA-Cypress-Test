class ContactPage {
  elements = {
    name: () => cy.get("#app div div:nth-child(1) input"),
    phone: () => cy.get("#app div div:nth-child(2) input"),
    email: () => cy.get("#app div div:nth-child(3) input"),
    add: () => cy.get("button[name='add']"),
    contactTableRows: () => cy.get("table tbody tr"),
    getContactTableName: (row) =>
      cy.get(`table tbody tr:nth-child(${row}) td:first-child`),
    getContactTablePhone: (row) =>
      cy.get(`table tbody tr:nth-child(${row}) td:nth-child(2)`),
    getContactTableEmail: (row) =>
      cy.get(`table tbody tr:nth-child(${row}) td:nth-child(3)`),
    getContactTableEditBtn: (row) =>
      cy.get(
        `table tbody tr:nth-child(${row}) td:nth-child(4) button[name='edit']`
      ),
    getContactTableDeleteBtn: (row) =>
      cy.get(
        `table tbody tr:nth-child(${row}) td:nth-child(4) button[name='delete']`
      ),
    getContactTableUpdateBtn: (row) =>
      cy.get(
        `table tbody tr:nth-child(${row}) td:nth-child(4) button[name='update']`
      ),
  };

  inputName = (name) => {
    cy.inputText(this.elements.name(), name);
  };

  addContactInfo = (name, phone, email) => {
    cy.inputText(this.elements.name(), name);
    cy.inputText(this.elements.phone(), phone);
    cy.inputText(this.elements.email(), email);
    cy.clickButton(this.elements.add());
  };

  editContactInfo = (name, phone, email, row) => {
    cy.inputText(this.elements.getContactTableName(row), name);
    cy.inputText(this.elements.getContactTablePhone(row), phone);
    cy.inputText(this.elements.getContactTableEmail(row), email);
  };

  clickEditBtn = (row) => {
    cy.clickButton(this.elements.getContactTableEditBtn(row));
  };

  clickDeleteBtn = (row) => {
    cy.clickButton(this.elements.getContactTableDeleteBtn(row));
  };

  clickUpdateBtn = (row) => {
    cy.clickButton(this.elements.getContactTableUpdateBtn(row));
  };
}

module.exports = new ContactPage();
