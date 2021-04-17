Feature: Task Update Screen
  Background:
    Given I have a task 'Task A', date 'Sat, 10 Apr'
    And I update 'Task A'

  Scenario: See UI
    Given any
    When I am at 'Task Update' Screen
    Then I should see 'Back' Button
    And I should see 'Task A'
    And I should see 'Sat, 10 Apr'
    And I should see 'Delete' Button
    And I should see 'Close' Button
    When I press 'Close' Button
    Then I should see 'Add date' Button

  Scenario: Press Back Button
    Given I am at 'Task Update' Screen
    When I press 'Back' Button
    Then I should see 'Dashboard Screen'

  Scenario: Press Back Button when cannot go back
    Given I cannot go back
    And I am at 'Task Update' Screen
    When I press 'Back' Button
    Then I should not see 'Dashboard Screen'

  Scenario: Delete Successful
    Given I am at 'Task Update' Screen
    When I press 'Delete' Button
    Then I should see 'Dashboard Screen'
    And I should not see 'Task A'

  Scenario: Delete Failed
    Given I am at 'Task Update' Screen
    And delete will always fail
    When I press 'Delete' Button
    Then I should see Error Message

  Scenario: Update Successful
    Given I am at 'Task Update' Screen
    When that I change 'Task Name' to 'Task A2'
    And I press 'Sat, 10 Apr'
    And I press 'Mark completed'
    And I press 'Cancel' Button
    And I press 'Save' Button
    Then I should see 'Dashboard Screen'
    And I should see 'Task A2', date 'Sat, 10 Apr'

  Scenario: Update Failed
    Given I am at 'Task Update' Screen
    And delete will always fail
    When that I change 'Task Name' to 'Task A2'
    And I press 'Save' Button
    Then I should see Error Message