Feature: Home Screen

    Scenario: See Home Screen
        Given that I have a task 'Task A'
        And that I have a task 'Task B'
        When I am at Home Screen
        Then I should see 'Tasks'
        And I should see 'Task A'
        And I should see 'Task B'
