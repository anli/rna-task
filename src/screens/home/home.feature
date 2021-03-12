Feature: Home Screen

    Scenario: See Home Screen
        Given I have a task 'Task A'
        And I have a task 'Task B'
        When I am at 'Home' Screen
        Then I should see 'Tasks'
        And I should see 'Task A'
        And I should see 'Task B'

    Scenario: Add Task Button
        Given I am at 'Home' Screen
        When I press 'Add Task' Button
        Then I should see 'Task Add' Screen
