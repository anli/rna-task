Feature: Home Screen

  Scenario: See Home Screen
    Given I have a task 'Task A', date 'Sat, 10 Apr'
    And I have a task 'Task B'
    When I am at 'Home' Screen
    Then I should see 'All Tasks'
    And I should see 'Task A'
    And I should see 'Task B'

  Scenario: Update Task
    Given I have a task 'Task A'
    And I am at 'Home' Screen
    When I press 'Task A' Button
    Then I should see 'Task Update' Screen

  Scenario: Filter tasks by What I can do
    Given I am logged in
    When App load
    And I press 'Filter' Button
    And I press 'What I can do'
    Then I should see 'What I can do'

  Scenario: Filter tasks by What I want to do Today
    Given I am logged in
    When App load
    And I press 'Filter' Button
    And I press 'What I want to do Today'
    Then I should see 'What I want to do Today'

  Scenario: Filter tasks by What I did Yesterday
    Given I am logged in
    When App load
    And I press 'Filter' Button
    And I press 'What I did Yesterday'
    Then I should see 'What I did Yesterday'

  Scenario: Mark task as completed
    Given I have 'Task A' not completed
    When App load
    And I press 'Task A' 'Mark as complete' Button
    Then I should see 'Task A' completed
    And I should see 'Succesful Toast'

  Scenario: See completed tasks
    Given I am at 'Home' Screen
    When I press 'Completed' button
    Then I should see 'Completed Tasks'

  Scenario: Mark task as not completed
    Given I have 'Completed Task' completed
    And I am at 'Home' Screen
    And I press 'Completed Task' 'Mark as not complete' Button
    Then I should see 'Completed Task' not completed
    And I should see 'Succesful Toast'

  Scenario: Mark task as done failed
    Given I have 'Task A' not completed
    And API to update task will fail
    And I am at 'Home' Screen
    When I press 'Task A' 'Mark as complete' Button
    Then I should see 'Error Toast'
