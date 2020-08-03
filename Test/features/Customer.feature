Feature: Create Customer
test customer creation and edition

@smoke
  Scenario: Create a new Customer
    Given I enter to the aplication
    And I navigate to Customer manager page
    And I click on new customer
    And I Send the information for new customer
    Then I see the new customer

@smoke
  Scenario: Create a new Customer
    Given I enter to the aplication
    And I navigate to Customer manager page
    And I search a customer
    And I Click on the customer
    And I Click on the edit button
    And I edit the customer information
    Then I see the customer edited