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

  Scenario: Update Name Successful
    Given I am at 'Task Update' Screen
    When that I change 'Task Name' to 'Task A2'
    And I lose focus on 'Task Name'
    And I press 'Back Button'
    Then I should see 'Dashboard Screen'
    And I should see 'Task A2'

  Scenario: Update Date Successful
    Given I am at 'Task Update' Screen
    And Task 'date' is null
    When that I change 'date' to 'Today'
    Then I should see 'date' to 'Today'
    And I should see 'Task' 'Updated'

  Scenario: Update Failed
    Given I am at 'Task Update' Screen
    And delete will always fail
    When that I change 'Task Name' to 'Task A2'
    And I press 'Save' Button
    Then I should see Error Message

  Scenario: Mark task as not completed
    Given I am at 'Task Update' Screen
    When I press 'Mark not completed'
    Then I should not see 'Dashboard Screen'
    And I should see Task has 'isCompleted' as 'false'

  Scenario: Mark task as completed
    Given I am at 'Task Update' Screen
    And I have task 'not completed'
    When I press 'Mark completed'
    Then I should see 'Dashboard Screen'
    And I should see Task has 'isCompleted' as 'true'

  Scenario: Update Schedule Successful
    Given I am at 'Task Update' Screen
    And Task 'schedule' is null
    When that I press 'Repeat'
    And I press 'Done'
    Then I should see 'schedule' to 'Repeats every 1 week'
    And I should see 'Task' 'Updated'

  Scenario: Update Schedule Frequency Successful
    Given I am at 'Task Update' Screen
    And Task 'schedule' is 'Repeats every 1 week'
    When that I press 'Repeats every 2 week'
    And that I move slider to '2'
    And I press 'Done'
    Then I should see 'schedule' to 'Repeats every 2 week'
    And I should see 'Task' 'Updated'

  Scenario: Clear Schedule Successful
    Given I am at 'Task Update' Screen
    And Task 'schedule' is 'Repeats every 1 week'
    When that I press 'Clear Schedule'
    Then I should see 'schedule' to 'Repeat'
    And I should see 'Task' 'Updated'

  Scenario: Mark schedule task as completed
    Given I am at 'Task Update' Screen
    And Task 'schedule' is 'Repeats every 1 week'
    When that I press 'mark completed'
    Then I should see 'Dashboard Screen'
    And I should see Task has 'isCompleted' as 'true'
    And I should see new Task with date '1 week later' and not completed