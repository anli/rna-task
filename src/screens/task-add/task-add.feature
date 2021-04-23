Feature: Task Add Screen

  Scenario: See UI
    Given any
    When I am at 'Task Add' Screen
    Then I should see 'Back' Button
    And I should see 'Task Name' Input
    And I should see 'Save' Button

  Scenario: Press Back Button
    Given I am at 'Task Add' Screen
    When I press 'Back' Button
    Then I should see 'Dashboard Screen'

  Scenario: Press Back Button when cannot go back
    Given I cannot go back
    And I am at 'Task Add' Screen
    When I press 'Back' Button
    Then I should not see 'Dashboard Screen'

  Scenario: Add Task Successful
    Given I am at 'Task Add' Screen
    And I enter 'Task A' to 'Task Name' Input
    When I press 'Add date' Button
    And I press 'Cancel' Button
    And I press 'Add date' Button
    And I press 'Confirm' Button
    And I press 'Save' Button
    Then I should see 'Dashboard Screen'
    And I should see 'Task A', date 'Today'

  Scenario: Add Task Validation Failed
    Given I am at 'Task Add' Screen
    When I press 'Save' Button
    Then I should see 'This is required.'

  Scenario: Add Task API Failed
    Given I am at 'Task Add' Screen
    And Add Task API will always fail
    When I enter form data
    And I press 'Save' Button
    Then I should see Error Message

  Scenario: Process task description successfully
    Given I am at 'Task Add' Screen
    When I enter 'Task A Today' to 'Task Name' Input
    Then I should see date chip set to 'Today'

  Scenario: Press Clear Text Button
    Given I am at 'Task Add' Screen
    And I enter 'Task A' to 'Task Name' Input
    When I press 'Clear Text' Button
    Then I should see '' in 'Task Name' Input