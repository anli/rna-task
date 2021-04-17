Feature: Home Screen

  Scenario: See Home Screen
    Given I have a task 'Task A', date 'Sat, 10 Apr'
    And I have a task 'Task B'
    When I am at 'Home' Screen
    Then I should see 'All Tasks'
    And I should see 'Task A'
    And I should see 'Task B'

  Scenario: Add Task Button
    Given I am at 'Home' Screen
    When I press 'Add Task' Button
    Then I should see 'Task Add' Screen

  Scenario: Update Task
    Given I have a task 'Task A'
    And I am at 'Home' Screen
    When I press 'Task A' Button
    Then I should see 'Task Update' Screen

  Scenario: Filter tasks by today
    Given I am logged in
    When App load
    And I press 'Filter' Button
    And I press 'Today'
    Then I should see 'Today's Tasks'

  Scenario: Filter tasks by yesterday
    Given I am logged in
    When App load
    And I press 'Filter' Button
    And I press 'Yesterday'
    Then I should see 'Yesterday's Tasks'

  Scenario: See completed task
    Given I am logged in
    And I have a completed task
    When App load
    Then I should see completed task correctly