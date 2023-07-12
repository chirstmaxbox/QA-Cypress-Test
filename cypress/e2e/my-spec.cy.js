import contactPage from "../pages/contact.page";

describe("Test Contact App", () => {
  beforeEach(() => {
    cy.visit("./contact_app.html");
  });

  it("Test if the application loads correctly", () => {
    cy.get("h1.text-center").should("have.text", "Contact List App");
    cy.get("table tbody tr").should("have.length", 1);
  });

  it("Test if a name field works properly", () => {
    // name should not include any number, if it is number => one of the solution is to disable "Add button"
    contactPage.inputName("1kerry tran");
    contactPage.elements.add().should("be.disabled");

    // or maybe it's not allowing to be empty
    contactPage.inputName("");
    contactPage.elements.add().should("be.disabled");
  });

  it("Test if a phone field works properly", () => {
    // phone should be only 10 digits values [0-9]
  });

  it("Test if an email field works properly", () => {
    // email should be in correct format xxx@yyy.zzz
    // or maybe it's not allowing to be empty
  });

  it("Test if a new contact can be added correctly", () => {
    contactPage.addContactInfo(
      "kerry tran",
      "7782557878",
      "kerrytran1982@outlook.com"
    );
    contactPage.elements.contactTableRows().should("have.length", 2);
    contactPage.elements
      .getContactTableName(2)
      .should("have.text", "kerry tran");
    contactPage.elements
      .getContactTablePhone(2)
      .should("have.text", "7782557878");
    contactPage.elements
      .getContactTableEmail(2)
      .should("have.text", "kerrytran1982@outlook.com");
    contactPage.elements.getContactTableEditBtn(2).should("exist");
    contactPage.elements.getContactTableDeleteBtn(2).should("exist");
  });

  it("Test if 2 more new contacts can be added correctly", () => {
    contactPage.addContactInfo(
      "kerry tran",
      "7782557878",
      "kerrytran1982@outlook.com"
    );
    contactPage.addContactInfo(
      "kerry tran1",
      "77825578781",
      "kerrytran19821@outlook.com"
    );
    contactPage.elements.contactTableRows().should("have.length", 3);
    contactPage.elements
      .getContactTableName(3)
      .should("have.text", "kerry tran1");
    contactPage.elements
      .getContactTablePhone(3)
      .should("have.text", "77825578781");
    contactPage.elements
      .getContactTableEmail(3)
      .should("have.text", "kerrytran19821@outlook.com");
    contactPage.elements.getContactTableEditBtn(2).should("exist");
    contactPage.elements.getContactTableDeleteBtn(2).should("exist");
  });

  it("Test if a duplicate contact cannot be added properly", () => {
    contactPage.addContactInfo(
      "kerry tran",
      "7782557878",
      "kerrytran1982@outlook.com"
    );
    // try to add a duplicate contact
    contactPage.addContactInfo(
      "kerry tran",
      "7782557878",
      "kerrytran1982@outlook.com"
    );

    // not sure about the behaviour of the application,
    // in this test, i assume that the duplicated contact cannot be added
    contactPage.elements.contactTableRows().should("have.length", 2);
  });

  it("Test if user can edit an existing contact properly", () => {
    contactPage.addContactInfo(
      "kerry tran",
      "7782557878",
      "kerrytran1982@outlook.com"
    );
    contactPage.clickEditBtn(2);
    contactPage.editContactInfo(
      "new kerry tran",
      "123456789",
      "newkerry@outlook.com",
      2
    );
    contactPage.clickUpdateBtn(2);
    contactPage.elements
      .getContactTableName(2)
      .should("have.text", "new kerry tran");
    /* look like the application is failed when editing 3 fields at the same time */
    contactPage.elements
      .getContactTablePhone(2)
      .should("have.text", "123456789");
    contactPage.elements
      .getContactTableEmail(2)
      .should("have.text", "newkerry@outlook.com");
    contactPage.elements.getContactTableEditBtn(2).should("exist");
    contactPage.elements.getContactTableDeleteBtn(2).should("exist");
    contactPage.elements.getContactTableUpdateBtn(2).should("not.exist");
  });

  it("Test if user can delete an existing contact properly", () => {
    contactPage.addContactInfo(
      "kerry tran",
      "7782557878",
      "kerrytran1982@outlook.com"
    );
    contactPage.elements.contactTableRows().should("have.length", 2);
    contactPage.clickDeleteBtn(2);
    contactPage.elements.contactTableRows().should("have.length", 1);
  });

  // Add tests here
});
