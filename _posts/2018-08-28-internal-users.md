---
layout: post
title: Planning Time for Internal Users
tags: general
date: 2018-08-28
---

The data exposed in a customer-facing UI is not the data internal users care about.

Yet, this data forms the basis for the abstractions developers create. Easy-to-use APIs and GUIs generally expose the data the customer can access. Exposing data not exposed to the customer — think user behavior, hyper-granular statistics captured by IoT equipment, growth rates over specific time periods — is not easy.

The APIs, GUIs and abstractions dedicated to customer-facing data are rarely usable for internal data. This is a problem because internal users often have greater and more immediate data needs than customers. These users deserve as much attention as customers.

Why? Internal data should be easy to access and analyze because it contains time-sensitive information about a company’s customers and its products that hold the key to growth. If internal users at a company can easily access data over any time period, they can determine customer behavior in response to changes in the product. Some real-world examples of data internal to a company revealing information essential to company strategy:

- Buzzfeed shows [different titles and thumbnail art to different users](http://www.niemanlab.org/2017/09/buzzfeeds-strategy-for-getting-content-to-do-well-on-all-platforms-adaptation-and-a-lot-of-ab-testing/) for the same story, tracking the traffic from the different versions to optimize what it publishes
- Intuit runs [real-world experiments within its products](https://www.fastcompany.com/3020699/why-intuit-founder-scott-cook-wants-you-to-stop-listening-to-your-boss) and pursues or abandons ideas based on the results
- [Amazon actively maps the relationship between site speed and sales](https://blog.gigaspaces.com/amazon-found-every-100ms-of-latency-cost-them-1-in-sales/)

Eric Ries refers to this concept as completing a feedback loop in the shortest possible amount of time and argues it is the key to how quickly a start-up can grow in [The Lean Startup](https://www.amazon.com/dp/B004J4XGN6/ref=dp-kindle-redirect?_encoding=UTF8&btkr=1). Investment in internal data is an investment in the customer.

The internal data needs of a company change not on a Scrum schedule, but on a minute-to-minute or even second-to-second schedule. This is especially true in industries like fintech (think flash crash) and automotive (think actual crash), where being able to capture what happened in the space of a few milliseconds can save a company.

Ability to analyze your data will determine the fate of your start-up. This is the number one reason to invest time in making data easier to share and analyze.

How much time is enough time for teams to invest? 15 minutes is a start that could lead to perpetual gains. If you’re a Scrum Master, organize a short meeting with the developers who interact with your databases and business analysts who generate the most inbound. You can pre-wire this meeting by asking the business analysts to generate a list of their biggest pain points. You can ask the developers what they could do in one hour or less to start addressing these pain points. Something as simple as a cron job that e-mails internal users key data or a CSV that can feed pivot tables is a useful outcome from this meeting.

If this meeting proves valuable, consider making it recurring and using it as a basis for small to medium-sized tasks that can be pulled in each sprint. When I’ve done similar exercises at previous companies, the first data-access related meeting has led to a host of issues being identified and even resolved in one day. In one instance, a co-worker who needed access to test data (only used internally) asked if there was any way he could periodically get data for one specific query. My company at the time had a GraphQL API with graphiql exposed in the test environment; I was able to give my co-worker graphiql access, and he was writing queries just with the GraphQL docs as a guide in 5 minutes.

How much time will good data tooling save? Possibly years. Building internal data tools is no different than building features in that it is an investment in customer success. Buzzfeed, Intuit and Amazon in the examples above all used internal data to drive customer acquisition and retention. Additionally, strong data tooling impacts employee retention as business analysts expect data to be easy to access and analyze, and developers expect that their schedule to be free of fire-drills.

Investments in improving data tooling pay long-term dividends. Finding time for them this sprint — and not three months into the product backlog — matters as much as building the product.

