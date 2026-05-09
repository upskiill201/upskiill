from playwright.sync_api import sync_playwright

def run_cuj(page):
    # Go to login page
    page.goto("http://localhost:3001/creator/login")
    page.wait_for_timeout(1000)

    # Fill in login credentials
    page.get_by_label("Email address").fill("alex@upskiill.com")
    page.wait_for_timeout(500)
    page.get_by_label("Password").fill("password123")
    page.wait_for_timeout(500)

    # Click Sign In
    page.get_by_role("button", name="Sign In to Studio").click()

    # Wait for login to complete and redirect
    page.wait_for_timeout(3000)

    # Now navigate to the lesson builder
    page.goto("http://localhost:3001/creator/courses/mock-course-id/lesson-builder/mock-lesson-id")
    page.wait_for_timeout(2000)

    # Verify elements are on the page
    page.screenshot(path="/home/jules/verification/screenshots/verification.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()
        try:
            run_cuj(page)
        finally:
            context.close()
            browser.close()
