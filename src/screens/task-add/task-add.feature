Feature: Task Add Screen

  Scenario: See UI
    Given any
    When I am at 'Task Add' Screen
    Then I should see 'Back' Button
    And I should see 'Add date'
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

  Scenario: Add Task Failed
    Given I am at 'Task Add' Screen
    And Add Task will always fail
    When I press 'Save' Button
    Then I should see 'This is required.'
    When I enter 'Task A' to 'Task Name' Input
    And I press 'Save' Button
    Then I should see Error Message