Feature: Task Add Screen

  Scenario: See UI
    Given any
    When I am at 'Task Add' Screen
    Then I should see 'Back' Button
    And I should see 'Add Task'
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
    Then I should see 'Dashboard Screen'

  Scenario: Press Save Button
    Given I am at 'Task Add' Screen
    And I enter 'Task A' to 'Task Name' Input
    When I press 'Save' Button
    Then I should see 'Dashboard Screen'
    And I should see 'Task A'