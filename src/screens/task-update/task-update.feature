Feature: Task Update Screen
  Background:
    Given I have a task 'Task A'
    And I update 'Task A'

  Scenario: See UI
    Given any
    When I am at 'Task Update' Screen
    Then I should see 'Back' Button
    And I should see 'Task A'
    And I should see 'Delete' Button

  Scenario: Press Back Button
    Given I am at 'Task Update' Screen
    When I press 'Back' Button
    Then I should see 'Dashboard Screen'

  Scenario: Press Back Button when cannot go back
    Given I cannot go back
    And I am at 'Task Update' Screen
    When I press 'Back' Button
    Then I should not see 'Dashboard Screen'

  Scenario: Press Delete Button
    Given I am at 'Task Update' Screen
    When I press 'Save' Button
    Then I should see 'Dashboard Screen'
    And I should not see 'Task A'