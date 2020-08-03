Feature: Log in
test login on loanpro_users

@regression
  Scenario: Log in using correct credentials
    Given I navigate to application
    And I log in using "loanpro_users" as "user" user
    Then I see the companies in the page