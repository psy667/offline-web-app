import asyncio
from asyncio import sleep

from ariadne import SubscriptionType

subscription = SubscriptionType()


@subscription.source("counter")
async def counter_generator(obj, info):
    for i in range(1, 5):
        await sleep(1)
        yield i


@subscription.field("counter")
def counter_resolver(count, info):
    return 1
